import classNames from 'classnames';
import { ListConnection } from '../ListConnection';
import { RowTreeNodeView } from '../types';
import { OutlayListViewItem } from '../OutlayListViewItem';
import { OutlayListEditItem } from '../OutlayListEditItem';
import styles from './OutlayList.module.scss';
import { ListItemIcon, TrashItemIcon } from '~/assets/icons';
import { getUUID } from '~/utils/getUUID';

interface OutlayListProps {
  rowTreeNodeViewList: RowTreeNodeView[];
  deep: number;
  onDelete: (row: RowTreeNodeView) => void;
  onEdit: (row: RowTreeNodeView) => void;
  onPatch: (row: RowTreeNodeView) => void;
  editId: number | null;
  onAdd: (parent: RowTreeNodeView | null) => void;
  onCreate: (parent: RowTreeNodeView) => void;
  onAddCancel: () => void;
}
export function OutlayList({
  rowTreeNodeViewList,
  deep,
  onDelete,
  onEdit,
  editId,
  onPatch,
  onAdd,
  onCreate,
  onAddCancel,
}: OutlayListProps) {
  return (
    <div className={styles.OutlayListWrapper}>
      <table className={styles.OutlayList}>
        <thead>
          <tr>
            <th>
              <span className={styles.levelHeaderWrapper}>
                <button onClick={() => onAdd(null)}>
                  <ListItemIcon />
                </button>
                <span>Уровень</span>
              </span>
            </th>
            <th>Наименование</th>
            <th>Основная з/п</th>
            <th>Оборудование</th>
            <th>Накладные расходы</th>
            <th>Сметная прибыль</th>
          </tr>
        </thead>
        <tbody>
          {rowTreeNodeViewList.map((row) => {
            const isEdit = editId === row.body.id;

            const key = row.isNew ? getUUID() : row.body.id;

            return (
              <tr key={key} className={classNames(styles.tr)} onDoubleClick={() => onEdit(row)}>
                <td className={styles.levelTd}>
                  <ListConnection listPosition={row.listPosition} deep={deep}>
                    <div className={styles.iconsWrapper}>
                      <button onClick={() => onAdd(row)} disabled={row.isNew}>
                        <ListItemIcon />
                      </button>
                      {!row.isNew && (
                        <button onClick={() => onDelete(row)}>
                          <TrashItemIcon />
                        </button>
                      )}
                      {row.isNew && (
                        <button onClick={onAddCancel}>
                          <TrashItemIcon />
                        </button>
                      )}
                    </div>
                  </ListConnection>
                </td>

                {!isEdit && !row.isNew && <OutlayListViewItem row={row} />}
                {isEdit && !row.isNew && <OutlayListEditItem row={row} onSubmit={onPatch} />}
                {!isEdit && row.isNew && <OutlayListEditItem row={row} onSubmit={onCreate} />}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
