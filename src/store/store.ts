// Central Redux store combining RTK Query API and UI state slices
import { configureStore } from '@reduxjs/toolkit';

import { notesApi } from '../api/notesApi';

import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    search: searchReducer,
  },

  // Enables RTK Query caching, invalidation, and auto-refetch logic
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
});

// Inferred root state type for useSelector hooks
export type RootState = ReturnType<typeof store.getState>;

// Typed dispatch for useAppDispatch hook
export type AppDispatch = typeof store.dispatch;
