import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApis } from "./userApis";
import { clearCurrentUser } from "../redux/userSlice";

let baseUrl = process.env.REACT_APP_API_BASE_URL;

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/auth/Login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApis.endpoints.getCurrentUser.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),

      // clear user state if logout function is successful
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(clearCurrentUser());
          localStorage.removeItem("accessToken");
        } catch (error) {
          console.log(error);
        }
      },
    }),

    resetPasswordRequest: builder.mutation({
      query: (email) => ({
        url: "auth/reset-password",
        method: "POST",
        body: email,
      }),
    }),

    updateUserPassword: builder.mutation({
      query: (updateData) => ({
        url: "auth/update-password",
        method: "PUT",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useResetPasswordRequestMutation,
  useUpdateUserPasswordMutation,
} = authApis;
