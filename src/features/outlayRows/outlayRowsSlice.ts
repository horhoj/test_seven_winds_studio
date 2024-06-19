import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { makeLinkToHerAddress, makeRowTreeNodeViewList } from './helpers';
import { getApiErrors } from '~/api/common';
import { outlayRowsAPI } from '~/api/outlayRows';
import {
  CreatePatchBody,
  RowCreateResponseCurrent,
  RowPatchBody,
  RowPatchResponseCurrent,
  RowTreeNode,
} from '~/api/outlayRows.types';
import { RequestList, RequestStateProperty, makeRequestExtraReducer, makeRequestStateProperty } from '~/store/helpers';
import { RootState } from '~/store/types';
import { ApiError } from '~/api/common.types';

const SLICE_NAME = 'outlayRows';

interface IS {
  editRowId: number | null;
  addRowParentId: number | null | false;
  fetchRowListRequest: RequestStateProperty<RowTreeNode[], ApiError>;
  deleteRowListRequest: RequestStateProperty<unknown, ApiError>;
  patchRowListRequest: RequestStateProperty<unknown, ApiError>;
  createRowListRequest: RequestStateProperty<unknown, ApiError>;
}

const initialState: IS = {
  editRowId: null,
  addRowParentId: false,
  fetchRowListRequest: makeRequestStateProperty(),
  deleteRowListRequest: makeRequestStateProperty(),
  patchRowListRequest: makeRequestStateProperty(),
  createRowListRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
    delete: (state, action: PayloadAction<number[]>) => {
      if (state.fetchRowListRequest.data !== null) {
        const { elIdx, link } = makeLinkToHerAddress(state.fetchRowListRequest.data, action.payload);
        if (elIdx !== null) {
          link.splice(elIdx, 1);
        }
      }
    },
    update: (state, action: PayloadAction<{ links: number[]; current: RowPatchResponseCurrent }>) => {
      if (state.fetchRowListRequest.data !== null) {
        const { elIdx, link } = makeLinkToHerAddress(state.fetchRowListRequest.data, action.payload.links);
        if (elIdx !== null) {
          link[elIdx] = { ...action.payload.current, child: link[elIdx].child };
        }
      }
    },
    setEditRowId: (state, action: PayloadAction<number | null>) => {
      state.editRowId = action.payload;
    },

    setAddRowParentId: (state, action: PayloadAction<number | null | false>) => {
      if (state.fetchRowListRequest.data !== null) {
        state.addRowParentId = action.payload;
      }
    },

    add: (state, action: PayloadAction<{ links: number[]; current: RowCreateResponseCurrent }>) => {
      if (state.fetchRowListRequest.data !== null && state.addRowParentId !== false) {
        const { elIdx, link } = makeLinkToHerAddress(state.fetchRowListRequest.data, action.payload.links);
        if (elIdx !== null) {
          link.push({ ...action.payload.current, child: [] });
        }
      }
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchRowListThunk, 'fetchRowListRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, deleteRowListThunk, 'deleteRowListRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, patchRowListThunk, 'patchRowListRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, createRowListThunk, 'createRowListRequest');
  },
});

const fetchRowListThunk = createAsyncThunk(`${SLICE_NAME}/fetchRowListThunk`, async (_, store) => {
  try {
    const data = await outlayRowsAPI.fetchRowList();

    return data;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

interface DeleteRowListThunkPayload {
  rID: number;
  links: number[];
}

const deleteRowListThunk = createAsyncThunk(
  `${SLICE_NAME}/deleteRowListThunk`,
  async ({ rID, links }: DeleteRowListThunkPayload, store) => {
    try {
      const data = await outlayRowsAPI.deleteRowList(rID);
      store.dispatch(actions.delete(links));
      return data;
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

interface PatchRowListThunkPayload {
  rID: number;
  links: number[];
  body: RowPatchBody;
}

const patchRowListThunk = createAsyncThunk(
  `${SLICE_NAME}/patchRowListThunk`,
  async ({ rID, links, body }: PatchRowListThunkPayload, store) => {
    try {
      const data = await outlayRowsAPI.patchRowList(rID, body);
      store.dispatch(actions.update({ links, current: data.current }));
      store.dispatch(actions.setEditRowId(null));
      return data;
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

interface CreateRowListThunkPayload {
  links: number[];
  body: CreatePatchBody;
}

const createRowListThunk = createAsyncThunk(
  `${SLICE_NAME}/createRowListThunk`,
  async ({ links, body }: CreateRowListThunkPayload, store) => {
    try {
      const data = await outlayRowsAPI.createRow(body);
      store.dispatch(actions.add({ current: data.current, links }));
      store.dispatch(actions.setAddRowParentId(false));
      return data;
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

export const outlayRowsSlice = {
  actions,
  thunks: { fetchRowListThunk, deleteRowListThunk, patchRowListThunk, createRowListThunk },
} as const;

export const outlayRowsReducer = reducer;

export const treeNodeViewListSelector = createSelector(
  (state: RootState) => state.outlayRows.fetchRowListRequest.data,
  (state: RootState) => state.outlayRows.addRowParentId,
  (rowList, addRowParentId) => (rowList === null ? null : makeRowTreeNodeViewList(rowList, addRowParentId)),
);
