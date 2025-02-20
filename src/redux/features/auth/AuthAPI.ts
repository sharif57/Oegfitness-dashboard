// import baseAPIURL from "@/utils/baseURL";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authAPI = createApi({
//   reducerPath: "authAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseAPIURL,
//     prepareHeaders(headers, api) {
//       if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token");
//         if (token) {
//           headers.set("Authorization", `Bearer ${token}`);
//         }
//         return headers;
//       }
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<any, any>({
//       query: (credentials) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),

//     register: builder.mutation<any, any>({
//       query: (credentials) => ({
//         url: "/auth/register",
//         method: "POST",
//         body: credentials,
//       }),
//     }),

//     forgotPassword: builder.mutation({
//       query: (data) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     verifyEmail: builder.mutation({
//       query: (data) => ({
//         url: "/auth/verify-email",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     resetPassword: builder.mutation({
//       query: (data) => {
//         const token = localStorage.getItem("Authorization");

//         if (!token) {
//           throw new Error("No token found. Please verify your email again.");
//         }

//         return {
//           url: "/auth/reset-password",
//           method: "POST",
//           body: data, // Pass the payload here
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//       },
//     }),

//   }),
// });

// export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useVerifyEmailMutation , useResetPasswordMutation} = authAPI;


import baseAPI from "@/redux/api/baseAPI";


export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("Authorization");

        if (!token) {
          throw new Error("No token found. Please verify your email again.");
        }

        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data, // Pass the payload here
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authAPI;
