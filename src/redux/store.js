import { configureStore } from "@redux.js/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user";

export const store = configureStore({
  reducer: { movies: moviesReducer, user: userReducer },
});