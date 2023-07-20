interface TableItemData {
  id: string;
  name: string;
  isChecked: boolean;
  description: string;
}

interface CategoryData extends TableItemData {
  items: TableItemData[];
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

interface ActiveCell {
  row: number;
  column: number;
}

export type { TableItemData, CategoryData, TableProps, CategoryProps, ItemProps, ActiveCell };
