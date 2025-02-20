import baseAPI from "@/redux/api/baseAPI";

const WorkOutAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkOut: builder.query<any, void>({
      query: () => ({
        url: "/workout-plan/all-workout-plan",
        method: "GET",
      }),
      providesTags: ["WorkOut"],
    }),

    createWorkPlan: builder.mutation({
      query: (create) => ({
        url: "/workout-plan/create-workout-plan",
        method: "POST",
        body: create,
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   // "Content-Type": "application/json",
        // },
      }),
      invalidatesTags: ["WorkOut"],
    }),

  }),
});

export const { useGetAllWorkOutQuery, useCreateWorkPlanMutation } = WorkOutAPI;
