import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const userSlice = createSlice({
  initialState,
  name: "userState",
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    clearCurrentUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("refreshToken");
    },
  },
});

export default userSlice.reducer;

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
