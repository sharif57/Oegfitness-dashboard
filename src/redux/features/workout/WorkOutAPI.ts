import baseAPI from "@/redux/api/baseAPI";
import { create } from "domain";

const WorkOutAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkOut: builder.query<any, void>({
      query: () => ({
        url: "/workout-plan/all-workout-plan",
        method: "GET",
      }),
      providesTags: ["WorkOut"],
    }),

    createWorkOut: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/workout-plan/create-workout-plan",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const { useGetAllWorkOutQuery, useCreateWorkOutMutation } = WorkOutAPI;
