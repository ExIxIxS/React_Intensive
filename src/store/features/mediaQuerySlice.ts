import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MediaQuery, MediaQueryState } from 'src/interfaces/store.inrerfaces';

import { RootState } from 'src/store';
import { getCurrentMediaQuery } from 'src/utils/mediaQueryFunctions';

const initialMediaQueryState: MediaQueryState = {
  value: getCurrentMediaQuery(),
};

const mediaQuerySlice = createSlice({
  name: 'mediaQuery',
  initialState: initialMediaQueryState,
  reducers: {
    setMediaQuery: (state, action: PayloadAction<MediaQuery>) => {
      state.value = action.payload;
    },
  },
});

const { setMediaQuery } = mediaQuerySlice.actions;

const selectMediaQuery = (state: RootState) => {
  return state.mediaQuery.value;
};

const selectResolution = (state: RootState) => {
  return state.mediaQuery.value.resolution;
};

const selectDiviceType = (state: RootState) => {
  return state.mediaQuery.value.deviceType;
};

export { mediaQuerySlice, setMediaQuery, selectMediaQuery, selectResolution, selectDiviceType };

export default mediaQuerySlice.reducer;
