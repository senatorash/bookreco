import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApis } from "../lib/apis/userApis";
import { authApis } from "../lib/apis/authApis";
import userSlice from "../lib/redux/userSlice";

export const store = configureStore({
  reducer: {
    [userApis.reducerPath]: userApis.reducer,
    [authApis.reducerPath]: authApis.reducer,
    userState: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApis.middleware, authApis.middleware),
});

setupListeners(store.dispatch);
