import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from 'src/store';

import { CategoryData } from 'src/components/shared/table/table.interfaces';
import { DeleteItemPayload, TableDataState } from 'src/interfaces/store.inrerfaces';

const initialTableDataState: TableDataState = {
  value: [
    {
      id: uuid(),
      name: 'Test category',
      isChecked: true,
      description: 'Test category description',
      items: [
        { id: uuid(), name: 'Test item 1', isChecked: true, description: 'Test item description' },
        { id: uuid(), name: 'Test item 2', isChecked: true, description: 'Test item description' },
      ],
    },
  ],
};

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: initialTableDataState,
  reducers: {
    setTableData: (state, action: PayloadAction<CategoryData[]>): void => {
      state.value = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>): void => {
      const categories = state.value;
      const categoryIndex = categories.findIndex((category) => category.id === action.payload);

      if (categoryIndex >= 0) {
        categories.splice(categoryIndex, 1);
      }
    },
    deleteItem: (state, action: PayloadAction<DeleteItemPayload>): void => {
      const categories = state.value;
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
  return state.tableData.value;
};

export { tableDataSlice, selectTableData, setTableData, deleteCategory };

export default tableDataSlice.reducer;
