import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user/user";  // Correct path

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});