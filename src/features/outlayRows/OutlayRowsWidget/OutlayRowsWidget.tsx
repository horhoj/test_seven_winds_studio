import { useEffect } from 'react';
import { outlayRowsSlice, treeNodeViewListSelector } from '../outlayRowsSlice';
import { OutlayList } from '../OutlayList';
import { RowTreeNodeView } from '../types';
import styles from './OutlayRowsWidget.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function OutlayRowsWidget() {
  const dispatch = useAppDispatch();
  const treeNodeViewList = useAppSelector(treeNodeViewListSelector);
  const editId = useAppSelector((state) => state.outlayRows.editRowId);
  const addRowParentId = useAppSelector((state) => state.outlayRows.addRowParentId);

  useEffect(() => {
    dispatch(outlayRowsSlice.thunks.fetchRowListThunk());
    return () => {
      dispatch(outlayRowsSlice.actions.clear());
    };
  }, []);

  const handleDelete = (row: RowTreeNodeView) => {
    dispatch(outlayRowsSlice.actions.setEditRowId(null));
    dispatch(outlayRowsSlice.actions.setAddRowParentId(false));
    dispatch(outlayRowsSlice.thunks.deleteRowListThunk({ rID: row.body.id, links: row.links }));
  };

  const handleEdit = (row: RowTreeNodeView) => {
    dispatch(outlayRowsSlice.actions.setAddRowParentId(false));
    dispatch(outlayRowsSlice.actions.setEditRowId(row.body.id));
  };

  const handlePatch = (row: RowTreeNodeView) => {
    dispatch(outlayRowsSlice.thunks.patchRowListThunk({ rID: row.body.id, body: row.body, links: row.links }));
  };

  const handleAdd = (parent: RowTreeNodeView | null) => {
    dispatch(outlayRowsSlice.actions.setEditRowId(null));
    dispatch(outlayRowsSlice.actions.setAddRowParentId(parent?.body.id ?? null));
  };

  const handleCreate = (row: RowTreeNodeView) => {
    if (addRowParentId !== false) {
      dispatch(
        outlayRowsSlice.thunks.createRowListThunk({
          body: { ...row.body, parentId: addRowParentId },
          links: row.links,
        }),
      );
    }
  };

  const handleAddCancel = () => {
    dispatch(outlayRowsSlice.actions.setEditRowId(null));
    dispatch(outlayRowsSlice.actions.setAddRowParentId(false));
  };

  return (
    <div className={styles.OutlayRowsWidget}>
      {treeNodeViewList && (
        <OutlayList
          deep={treeNodeViewList.deep}
          rowTreeNodeViewList={treeNodeViewList.result}
          onDelete={handleDelete}
          onEdit={handleEdit}
          editId={editId}
          onPatch={handlePatch}
          onAdd={handleAdd}
          onCreate={handleCreate}
          onAddCancel={handleAddCancel}
        />
      )}
    </div>
  );
}
