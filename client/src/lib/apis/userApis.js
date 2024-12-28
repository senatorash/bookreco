import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCurrentUser, setCurrentUser } from "../redux/userSlice";

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
      // automatically update user state if get current user function is successful
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentUser(data?.user));
        } catch (error) {
          if (error?.error?.status === 403) {
            console.log("Acccess token expired. Attempting refresh...");

            // Attempt to refresh the access token
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
              const baseUrl = process.env.REACT_APP_API_BASE_URL;

              try {
                const refreshResponse = await fetch(`${baseUrl}/auth/token`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                  },
                  credentials: "include",
                });

                if (refreshResponse.ok) {
                  const refreshedData = await refreshResponse.json();

                  //update the user state with the refresh user data
                  dispatch(setCurrentUser(refreshedData?.user));

                  // retry the original `getCurrentUser` request
                  // const retryResponse = await fetch(`${baseUrl}/users/me`, {
                  //   method: "GET",
                  //   credentials: "include",
                  // });

                  // if (retryResponse.ok) {
                  //   const retryData = await retryResponse.json();
                  //   dispatch(setCurrentUser(retryData?.user));
                  // } else {
                  //   console.error(
                  //     "Failed to retry getCurrentUser after refresh"
                  //   );
                  // }
                } else {
                  // console.error(
                  //   "Refresh token invalid or expired. Logging out ..."
                  // );
                  dispatch(clearCurrentUser());
                }
              } catch (error) {
                // console.error("Error during token refresh:", error);
                dispatch(clearCurrentUser());
              }
            } else {
              // console.error("No refresh token found. Logging out...");
              dispatch(clearCurrentUser());
            }
          } else {
            // console.error("Error during getCurrentUser:", error);
          }
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
