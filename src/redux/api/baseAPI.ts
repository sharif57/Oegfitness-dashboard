import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://82.25.91.135:3005/api/v1",

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
    'Notifications',
  ],
  endpoints: () => ({}),
});

export default baseAPI;
