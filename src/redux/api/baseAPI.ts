import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://45.55.209.88:3006/api/v1",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Question",
    "Package",
    "Earning",
    "Users",
    "User",
    "Exercise",
    "Overview",
    "Nutrition",
    "Subscription",
    "WorkOut",
    "WorkoutPlan",
    "Appointments",
  ],
  endpoints: () => ({}),
});

export default baseAPI;
