import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'src/store';

import { getNewCategoryData, getNewRowItemData, getRowsAmount } from 'src/utils/tableDataFunctions';

import {
  ActiveCell,
  CategoryData,
  MoveDirectionType,
} from 'src/components/shared/table/table.interfaces';

import {
  CategoryBasicPayload,
  CategoryTextPayload,
  RowItemBasicPayload,
  RowItemTextPayload,
  TableState,
} from 'src/interfaces/store.inrerfaces';

const initCell = {
  row: 0,
  column: 0,
};

const initialTableState: TableState = {
  activeCell: initCell,
  data: [],
};

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: initialTableState,
  reducers: {
    createNewCategory: (state): void => {
      const newCategoryData = getNewCategoryData();

      state.data.push(newCategoryData);
      state.activeCell = {
        row: getRowsAmount(state.data) - 1,
        column: 0,
      };
    },
    createNewRowItem: (state, action: PayloadAction<CategoryBasicPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        const newItemData = getNewRowItemData();

        category.items.push(newItemData);
        state.activeCell = initCell;
      }
    },
    setTableData: (state, action: PayloadAction<CategoryData[]>): void => {
      state.data = action.payload;
    },
    setCategoryName: (state, action: PayloadAction<CategoryTextPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        category.name = action.payload.text;
      }
    },
    setRowItemName: (state, action: PayloadAction<RowItemTextPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        const rowItem = category.items.find((rowItem) => rowItem.id === action.payload.itemId);
        if (rowItem) {
          rowItem.name = action.payload.text;
        }
      }
    },
    setCategoryDescription: (state, action: PayloadAction<CategoryTextPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        category.description = action.payload.text;
      }
    },
    setRowItemDescription: (state, action: PayloadAction<RowItemTextPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        const rowItem = category.items.find((rowItem) => rowItem.id === action.payload.itemId);
        if (rowItem) {
          rowItem.description = action.payload.text;
        }
      }
    },
    toggleCategoryCheckbox: (state, action: PayloadAction<CategoryBasicPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        category.isChecked = !category.isChecked;
      }
    },
    toggleRowItemCheckbox: (state, action: PayloadAction<RowItemBasicPayload>): void => {
      const category = state.data.find((category) => category.id === action.payload.categoryId);

      if (category) {
        const rowItem = category.items.find((rowItem) => rowItem.id === action.payload.itemId);
        if (rowItem) {
          rowItem.isChecked = !rowItem.isChecked;
        }
      }
    },
    deleteCategory: (state, action: PayloadAction<string>): void => {
      const categories = state.data;
      const categoryIndex = categories.findIndex((category) => category.id === action.payload);

      if (categoryIndex >= 0) {
        categories.splice(categoryIndex, 1);
        state.activeCell = initCell;
      }
    },
    deleteItem: (state, action: PayloadAction<RowItemBasicPayload>): void => {
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

      const rowTopLimit = 0;
      const columnLeftLimit = 0;
      const columnRightLimit = 3;
      const rowsAmount = getRowsAmount(state.data);

      switch (direction) {
        case 'up': {
          activeCell.row = activeCell.row > rowTopLimit ? activeCell.row - 1 : activeCell.row;
          break;
        }
        case 'down': {
          activeCell.row = activeCell.row + 1 < rowsAmount ? activeCell.row + 1 : activeCell.row;
          break;
        }
        case 'left': {
          activeCell.column =
            activeCell.column > columnLeftLimit ? activeCell.column - 1 : activeCell.column;
          break;
        }
        case 'right': {
          activeCell.column =
            activeCell.column < columnRightLimit ? activeCell.column + 1 : activeCell.column;
          break;
        }
        case 'next': {
          if (activeCell.column < columnRightLimit) {
            activeCell.column = activeCell.column + 1;
            break;
          }

          if (activeCell.row + 1 < rowsAmount) {
            activeCell.column = columnLeftLimit;
            activeCell.row = activeCell.row + 1;
            break;
          }

          break;
        }
        default:
          break;
      }
    },
  },
});

const selectTableData = (state: RootState): CategoryData[] => {
  return state.tableData.data;
};

const selectTableActiveCell = (state: RootState): ActiveCell => {
  return state.tableData.activeCell;
};

const tableDataActions = tableDataSlice.actions;

export { tableDataSlice, selectTableData, selectTableActiveCell, tableDataActions };

export default tableDataSlice.reducer;
