import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.oegfitness.com/api/v1",
    // baseUrl: "http://192.168.10.233:3005/api/v1",

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
    "Notifications",
  ],
  endpoints: () => ({}),
});

export default baseAPI;
