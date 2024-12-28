import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userState",
  reducers: {
    setCurrentUser: (state, action) => {
      // const { user, accessToken } = action.payload;
      state.user = action.payload;
      state.accessToken = action.payload;
    },

    clearCurrentUser: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default userSlice.reducer;

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
