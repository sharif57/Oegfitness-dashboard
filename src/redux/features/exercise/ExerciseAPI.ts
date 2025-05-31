"use client";

import baseAPI from "@/redux/api/baseAPI";

export const planWorkoutApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    allWorkoutPlan: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: `/workout/all-workout?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Exercise"],
    }),

    createWorkoutPlan: builder.mutation({
      query: (formData) => ({
        url: "/workout/create-workout",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Exercise"],
    }),

    deletePlanWorkout: builder.mutation({
      query: (id) => ({
        url: `/workout/delete-workout/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Exercise"],
    }),

    // updatePlanWorkout: builder.mutation({
    //   query: ({ id, formData }) => ({
    //     url: `/workout/update-workout/${id}`,
    //     method: "PATCH",
    //     body: formData,
    //     formData: true,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   }),
    //   invalidatesTags: ["Exercise"],
    // }),
    updateWorkout: builder.mutation({
      query: ({ id, formData }) => ({
        url: `workout/update-workout/${id}`,
        method: "PATCH",
        body: formData,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      }),
      invalidatesTags: ["Exercise"],
    }),

    workoutDetail: builder.query({
      query: (id) => ({
        url: `/workout/single-workout/${id}`,
        // /workout/single-workout/6839a12dfa410453cb942eea
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Exercise"],
    }),
  }),
});

export const {
  useAllWorkoutPlanQuery,
  useCreateWorkoutPlanMutation,
  useDeletePlanWorkoutMutation,
  useUpdateWorkoutMutation,
  useWorkoutDetailQuery,
} = planWorkoutApi;
