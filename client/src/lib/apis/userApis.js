import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "../redux/userSlice";
import { authApis } from "./authApis";

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

export const userApis = createApi({
  reducerPath: "userApis",
  baseQuery: baseQueryWithTokenRefresh, //fetchBaseQuery({ baseUrl }),

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
      // automatically update user state if get current user function is successful
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data?.user));
        } catch (error) {
          // if (error.response?.status === 403) {
          //   await dispatch(
          //     authApis.endpoints.generateNewAccessToken.initiate()
          //   );
          // }
        }
      },
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useVerifyUserAccountMutation,
  useGetCurrentUserMutation,
} = userApis;
