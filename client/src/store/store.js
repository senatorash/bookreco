import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApis } from "../lib/apis/authApis";
import { userApis } from "../lib/apis/userApis";
import userSlice from "../lib/redux/userSlice";

const persistConfig = {
  key: "userState",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
    [userApis.reducerPath]: userApis.reducer,
    userState: persistedUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApis.middleware, authApis.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
