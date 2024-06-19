import { RowTreeNodeView } from '../types';

interface OutlayListViewItemProps {
  row: RowTreeNodeView;
}
export function OutlayListViewItem({ row }: OutlayListViewItemProps) {
  return (
    <>
      <td>{row.body.rowName}</td>
      <td>{row.body.salary.toLocaleString()}</td>
      <td>{row.body.equipmentCosts.toLocaleString()}</td>
      <td>{row.body.overheads.toLocaleString()}</td>
      <td>{row.body.estimatedProfit.toLocaleString()}</td>
    </>
  );
}
