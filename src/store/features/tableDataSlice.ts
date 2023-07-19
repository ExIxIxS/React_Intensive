import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from 'src/store';

import { CategoryData } from 'src/components/shared/table/table.interfaces';
import { TableDataState } from 'src/interfaces/store.inrerfaces';

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
  },
});

const { setTableData } = tableDataSlice.actions;

const selectTableData = (state: RootState): CategoryData[] => {
  return state.tableData.value;
};

export { tableDataSlice, setTableData, selectTableData };

export default tableDataSlice.reducer;
