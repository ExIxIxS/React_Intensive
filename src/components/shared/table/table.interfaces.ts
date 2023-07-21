interface TableItemData {
  id: string;
  name: string;
  isChecked: boolean;
  description: string;
}

interface CategoryData extends TableItemData {
  items: TableItemData[];
}

interface ActiveCell {
  row: number;
  column: number;
}

interface TableProps {
  data: CategoryData[];
}

interface CategoryProps {
  data: CategoryData;
  rowIndex: number;
}

interface ItemProps {
  categoryId: string;
  data: TableItemData;
  rowIndex: number;
}

type CellType = 'category name' | 'name' | 'description' | 'checkbox' | 'delete';

interface TableCellProps {
  type: CellType;
  categoryId: string;
  rowId?: string;
  rowIndex: number;
  columnIndex: number;
  text?: string;
  isChecked?: boolean;
  itemsAmount?: number;
  isExpanded?: boolean;
  clickHandler?: () => void;
}

type MoveDirectionType = 'right' | 'left' | 'up' | 'down' | 'next';

type KeyArrowType = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

export type {
  TableItemData,
  CategoryData,
  TableProps,
  CategoryProps,
  ItemProps,
  ActiveCell,
  TableCellProps,
  MoveDirectionType,
  KeyArrowType,
};
