// Redux slice for global search state used across notes filtering UI
import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Update search query string
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    // Reset search query to empty state
    clearSearch: (state) => {
      state.query = '';
    },
  },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
