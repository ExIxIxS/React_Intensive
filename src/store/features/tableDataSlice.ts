import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from 'src/store';

import { ActiveCell, CategoryData } from 'src/components/shared/table/table.interfaces';
import { DeleteItemPayload, TableState } from 'src/interfaces/store.inrerfaces';

const initialTableState: TableState = {
  activeCell: {
    row: 5,
    column: 2,
  },
  data: [
    {
      id: uuid(),
      name: 'Test category 1',
      isChecked: true,
      description: 'Test category description',
      items: [
        { id: uuid(), name: 'Test item 1', isChecked: true, description: 'Test item description' },
        { id: uuid(), name: 'Test item 2', isChecked: true, description: 'Test item description' },
      ],
    },
    {
      id: uuid(),
      name: 'Test category 2',
      isChecked: true,
      description: 'Test category description',
      items: [
        { id: uuid(), name: 'Test item 1', isChecked: true, description: 'Test item description' },
        { id: uuid(), name: 'Test item 2', isChecked: true, description: 'Test item description' },
        { id: uuid(), name: 'Test item 3', isChecked: true, description: 'Test item description' },
      ],
    },
  ],
};

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: initialTableState,
  reducers: {
    setTableData: (state, action: PayloadAction<CategoryData[]>): void => {
      state.data = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>): void => {
      const categories = state.data;
      const categoryIndex = categories.findIndex((category) => category.id === action.payload);

      if (categoryIndex >= 0) {
        categories.splice(categoryIndex, 1);
      }
    },
    deleteItem: (state, action: PayloadAction<DeleteItemPayload>): void => {
      const categories = state.data;
      const category = categories.find((category) => category.id === action.payload.categoryId);

      if (category) {
        const items = category.items;
        const itemIndex = items.findIndex((item) => item.id === action.payload.itemId);

        if (itemIndex >= 0) {
          items.splice(itemIndex, 1);
        }
      }
    },
  },
});

const { setTableData, deleteCategory } = tableDataSlice.actions;

const selectTableData = (state: RootState): CategoryData[] => {
  return state.tableData.data;
};

const selectTableActiveCell = (state: RootState): ActiveCell => {
  return state.tableData.activeCell;
};

export { tableDataSlice, selectTableData, selectTableActiveCell, setTableData, deleteCategory };

export default tableDataSlice.reducer;
