import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from 'src/store';

import {
  ActiveCell,
  CategoryData,
  MoveDirectionType,
} from 'src/components/shared/table/table.interfaces';
import { DeleteItemPayload, TableState } from 'src/interfaces/store.inrerfaces';

function getRowsAmount(data: CategoryData[]) {
  return data.reduce((rowsAmount, categoryData) => rowsAmount + 1 + categoryData.items.length, 0);
}

const initCell = {
  row: 0,
  column: 0,
};

const initialTableState: TableState = {
  activeCell: {
    row: 1,
    column: 0,
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
        state.activeCell = initCell;
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
          state.activeCell = initCell;
        }
      }
    },
    setActiveCell: (state, action: PayloadAction<ActiveCell>): void => {
      state.activeCell = action.payload;
    },
    moveActiveCell: (state, action: PayloadAction<MoveDirectionType>): void => {
      const direction = action.payload;
      const activeCell = state.activeCell;

      switch (direction) {
        case 'up': {
          const rowTopLimit = 0;
          activeCell.row = activeCell.row > rowTopLimit ? activeCell.row - 1 : activeCell.row;
          break;
        }
        case 'down': {
          const rowsAmount = getRowsAmount(state.data);
          activeCell.row = activeCell.row + 1 < rowsAmount ? activeCell.row + 1 : activeCell.row;
          break;
        }
        case 'left': {
          const columnLeftLimit = 0;
          activeCell.column =
            activeCell.column > columnLeftLimit ? activeCell.column - 1 : activeCell.column;
          break;
        }
        case 'right': {
          const columnRightLimit = 3;
          activeCell.column =
            activeCell.column < columnRightLimit ? activeCell.column + 1 : activeCell.column;
          break;
        }
        default:
          break;
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
