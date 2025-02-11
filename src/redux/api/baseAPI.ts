import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://115.127.156.13:3005/api/v1",

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
    "Room",
    "Users",
    "User",
    "WorkOut",
    "WorkoutPlan",
    "Appointments",
  ],
  endpoints: () => ({}),
});

export default baseAPI;
