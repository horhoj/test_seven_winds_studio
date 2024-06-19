import { RowTreeNodeView } from '../types';

interface OutlayListViewItemProps {
  row: RowTreeNodeView;
}
export function OutlayListViewItem({ row }: OutlayListViewItemProps) {
  return (
    <>
      <td>{row.body.rowName}</td>
      <td>{row.body.salary}</td>
      <td>{row.body.equipmentCosts}</td>
      <td>{row.body.overheads}</td>
      <td>{row.body.estimatedProfit}</td>
    </>
  );
}
