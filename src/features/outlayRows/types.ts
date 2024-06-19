import { RowTreeNode } from '~/api/outlayRows.types';

export enum ListPosition {
  START = '+',
  END = '-',
  CENTER = '>',
  EMPTY = '#',
  BOUND = '|',
}

export type RowTreeNodeBody = Omit<RowTreeNode, 'child'>;

export interface RowTreeNodeView {
  body: RowTreeNodeBody;
  links: number[];
  listPosition: ListPosition[];
  isNew: boolean;
}
