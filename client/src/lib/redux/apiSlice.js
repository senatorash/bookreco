import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser, clearCurrentUser } from "./userSlice";

let baseUrl = process.env.REACT_APP_API_BASE_URL;

// const baseQuery = fetchBaseQuery({
//   baseUrl,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().userState.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include", // Include cookies for every request
});

export const baseQueryWithTokenRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log(`Access token expired. Attempting refresh...`);
    // send refresh token to get the new access token
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.log("No refresh token found. Logging out...");
      api.dispatch(clearCurrentUser());
      return result;
    }
    const tokenResult = await baseQuery(
      {
        url: "auth/token",
        method: "POST",
        headers: { authorization: `Bearer ${refreshToken}` },
      },
      api,
      extraOptions
    );
    console.log(tokenResult);
    if (tokenResult?.data) {
      const user = api.getState().userState;
      //   store the new token
      api.dispatch(setCurrentUser({ user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Refresh token invalid or expired. Logging out...");
      api.dispatch(clearCurrentUser());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithTokenRefresh,
  endpoints: (builder) => ({
    // define the endpoints
  }),
});
