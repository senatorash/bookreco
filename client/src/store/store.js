import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApis } from "../lib/apis/authApis";
import { userApis } from "../lib/apis/userApis";
import userSlice from "../lib/redux/userSlice";

export const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
    [userApis.reducerPath]: userApis.reducer,
    userState: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApis.middleware, authApis.middleware),
});

setupListeners(store.dispatch);
