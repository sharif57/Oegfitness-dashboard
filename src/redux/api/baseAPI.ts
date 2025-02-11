// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://115.127.156.13:3005/api/v1",
// });

// export const baseAPI = createApi({
//   baseQuery,
//   endpoints: () => ({}),
//   reducerPath: "baseAPI",
//   tagTypes: ["Users", "User"],
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
  reducerPath: "api",
  endpoints: () => ({}), // Empty object, later extended using injectEndpoints
  baseQuery: fetchBaseQuery({ baseUrl: "http://115.127.156.13:3005/api/v1" }),
  tagTypes: ["Question", "Package", "Room", "Users", "User", "WorkoutPlan"], // Declare global tag types
});

export default baseAPI;
