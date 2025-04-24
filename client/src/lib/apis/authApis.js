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
        url: "/auth/login",
        method: "POST",
        body: loginData,
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApis.endpoints.getCurrentUser.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loginUserWithGoogle: builder.mutation({
      query: (googleData) => ({
        url: "/auth/google/login",
        method: "POST",
        body: googleData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApis.endpoints.getCurrentUser.initiate(null));
        } catch (error) {}
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
          await queryFulfilled;
          dispatch(clearCurrentUser());
          localStorage.removeItem("refreshToken");
          localStorage.clear();
          await persistor.purge();
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

    // generateNewAccessToken: builder.mutation({
    //   query: () => ({
    //     url: "auth/access-token",
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json", // Set Content-Type header if needed
    //     },
    //   }),

    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //       // localStorage.setItem("accessToken", data.accessToken);
    //     } catch (error) {}
    //   },
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useResetPasswordRequestMutation,
  useUpdateUserPasswordMutation,
  useLoginUserWithGoogleMutation,
} = authApis;
