import { v4 as uuid } from 'uuid';

import { CategoryData, TableItemData } from 'src/components/shared/table/table.interfaces';

function getNewCategoryData(): CategoryData {
  return {
    id: uuid(),
    name: 'New category',
    isChecked: true,
    description: 'New category description',
    items: [],
  };
}

function getNewRowItemData(): TableItemData {
  return { id: uuid(), name: 'New item', isChecked: true, description: 'Item description' };
}

function getRowsAmount(data: CategoryData[]) {
  return data.reduce((rowsAmount, categoryData) => rowsAmount + 1 + categoryData.items.length, 0);
}

export { getNewCategoryData, getNewRowItemData, getRowsAmount };
