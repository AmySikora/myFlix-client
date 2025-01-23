import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // Suppress ESLint warning for unused `state`
    // eslint-disable-next-line no-unused-vars
    setUser: (state, action) => {
      return action.payload;
    },
    // Suppress ESLint warning for unused `state`
    // eslint-disable-next-line no-unused-vars
    logoutUser: (state) => {
      return null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
