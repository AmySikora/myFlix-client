import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = ""; // Clear the filter value
    },
  },
});

export const { setMovies, setFilter, resetFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
