import { configureStore } from '@reduxjs/toolkit';

import mediaQueryReducer from 'src/store/features/mediaQuerySlice';

const appStore = configureStore({
  reducer: {
    mediaQuery: mediaQueryReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
