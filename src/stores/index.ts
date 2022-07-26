import { combineReducers, configureStore } from '@reduxjs/toolkit';

import viewReducer from './slices/viewSlice';

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  view: viewReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
