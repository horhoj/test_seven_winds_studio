import { ListPosition, RowTreeNodeView } from './types';
import { RowTreeNode } from '~/api/outlayRows.types';

const ID_FOR_NEW = -999;

const makeNew = (): RowTreeNode => ({
  id: ID_FOR_NEW,
  rowName: '',
  total: 0,
  salary: 0,
  mimExploitation: 0,
  machineOperatorSalary: 0,
  materials: 0,
  mainCosts: 0,
  supportCosts: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  child: [],
});

export const makeRowTreeNodeViewList = (treeX: RowTreeNode[], addRowParentId: number | null | false) => {
  const result: RowTreeNodeView[] = [];
  let deep = 0;

  const tree = treeX.slice();

  if (addRowParentId === null) {
    tree.push(makeNew());
  }

  const runner = (tree: RowTreeNode[], links: number[], prevListPosition: ListPosition[]) => {
    tree.forEach(({ child, ...body }, index, arr) => {
      let listPosition: ListPosition = ListPosition.START;
      if (index < arr.length - 1 && index > 0) {
        listPosition = ListPosition.CENTER;
      }
      if (index === arr.length - 1) {
        listPosition = ListPosition.END;
      }
      if (arr.length > deep) {
        deep = arr.length;
      }
      const lastPrevPosition = prevListPosition[prevListPosition.length - 1];
      const prevListPositionClone = prevListPosition.slice();
      if (lastPrevPosition === ListPosition.END) {
        prevListPositionClone[prevListPosition.length - 1] = ListPosition.EMPTY;
      }
      if (lastPrevPosition === ListPosition.CENTER || lastPrevPosition === ListPosition.START) {
        prevListPositionClone[prevListPosition.length - 1] = ListPosition.BOUND;
      }

      const currentListPosition = [...prevListPositionClone, listPosition];
      result.push({ body, listPosition: currentListPosition, links: [...links, index], isNew: ID_FOR_NEW === body.id });
      const actualChild = child.slice();
      if (addRowParentId === body.id) {
        actualChild.push(makeNew());
      }

      runner(actualChild, [...links, index], currentListPosition);
    });
  };

  runner(tree, [], []);

  return { result, deep };
};

export const makeLinkToHerAddress = (tree: RowTreeNode[], links: number[]) => {
  let link: RowTreeNode[] = tree;
  let elIdx: null | number = null;
  links.forEach((idx, index, arr) => {
    if (arr.length - 1 === index) {
      elIdx = idx;
    } else {
      link = link[idx]?.child;
    }
  });

  return { link, elIdx };
};
