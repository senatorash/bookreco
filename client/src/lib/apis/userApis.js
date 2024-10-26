import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "../redux/userSlice";

let baseUrl = process.env.REACT_APP_API_BASE_URL;

export const userApis = createApi({
  reducerPath: "userApis",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),

    verifyUserAccount: builder.mutation({
      query: (verificationToken) => ({
        url: "/users/verify",
        method: "PUT",
        body: verificationToken,
      }),
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        url: "users/me",
        method: "GET",
        credentials: "include",
      }),
      // automatically update uuser state if get current user function is successful
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data?.user));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useVerifyUserAccountMutation,
  useGetCurrentUserMutation,
} = userApis;
