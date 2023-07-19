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
}

interface ItemProps {
  data: TableItemData;
}

export type { TableItemData, CategoryData, TableProps, CategoryProps, ItemProps };
