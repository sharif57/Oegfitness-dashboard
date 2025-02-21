import baseAPI from "@/redux/api/baseAPI";

const WorkOutAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkOut: builder.query<any, void>({
      query: () => ({
        url: "/exercise/all",
        method: "GET",
      }),
      providesTags: ["WorkOut"],
    }),

    createWorkPlan: builder.mutation({
      query: (create) => ({
        url: "/workout-plan/create-workout-plan",
        method: "POST",
        body: create,
      }),
      invalidatesTags: ["WorkOut"],
    }),

    workPlanDetails: builder.query({
      query: (_id) => ({
        url: `/workout-plan/workout-plan-details/${_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["WorkOut"], // Marks the fetched data with the "Question" tag
    }),

    updateWorkPlan: builder.mutation({
      query: (update) => ({
        url: `/workout-plan/update-workout-plan/${update._id}`,
        method: "POST",
        body: update,
      }),
      invalidatesTags: ["WorkOut"],
    }),

  }),
});

export const { useGetAllWorkOutQuery, useCreateWorkPlanMutation , useWorkPlanDetailsQuery, useUpdateWorkPlanMutation} = WorkOutAPI;
