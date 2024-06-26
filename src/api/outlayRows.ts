import { axiosInstance } from './apiTransport';
import {
  CreatePatchBody,
  RowCreateResponse,
  RowDeleteResponse,
  RowPatchBody,
  RowPatchResponse,
  RowTreeNode,
} from './outlayRows.types';

const fetchRowList = async () => {
  const res = await axiosInstance.request<RowTreeNode[]>({ url: '/row/list', method: 'get' });

  return res.data;
};

const deleteRowList = async (rID: number) => {
  const res = await axiosInstance.request<RowDeleteResponse>({
    url: `/row/${rID}/delete`,
    method: 'delete',
  });

  return res.data;
};

const patchRowList = async (rID: number, body: RowPatchBody) => {
  const res = await axiosInstance.request<RowPatchResponse>({
    url: `/row/${rID}/update`,
    method: 'post',
    data: body,
  });

  return res.data;
};

const createRow = async (body: CreatePatchBody) => {
  const res = await axiosInstance.request<RowCreateResponse>({
    url: `/row/create`,
    method: 'post',
    data: body,
  });

  return res.data;
};

export const outlayRowsAPI = { fetchRowList, deleteRowList, patchRowList, createRow } as const;
