import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApis } from "./userApis";
import { clearCurrentUser } from "../redux/userSlice";

let baseUrl = process.env.REACT_APP_API_BASE_URL;
const baseQueryWithTokenRefresh = async (args, api, extraOptions) => {
  const baseQueryResult = await fetchBaseQuery({
    baseUrl,
    credentials: "include",
  })(args, api, extraOptions);

  if (baseQueryResult.error?.status === 403) {
    const refreshResult = await api.dispatch(
      authApis.endpoints.generateNewAccessToken.initiate()
    );
    if (refreshResult?.data?.accessToken) {
      baseQueryResult = await fetchBaseQuery({
        baseUrl,
        credentials: "include",
      })(args, api, extraOptions);
    } else {
      api.dispatch(authApis.endpoints.logoutUser.initiate());
    }
  }
  return baseQueryResult;
};

export const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: baseQueryWithTokenRefresh, //fetchBaseQuery({ baseUrl }),

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
          await queryFulfilled;
          dispatch(clearCurrentUser());
          localStorage.removeItem("refreshToken");
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

    generateNewAccessToken: builder.mutation({
      query: () => ({
        url: "auth/access-token",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Set Content-Type header if needed
        },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // localStorage.setItem("accessToken", data.accessToken);
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useResetPasswordRequestMutation,
  useUpdateUserPasswordMutation,
  useGenerateNewAccessTokenMutation,
} = authApis;
