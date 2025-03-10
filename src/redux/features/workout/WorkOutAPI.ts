import baseAPI from "@/redux/api/baseAPI";

const WorkOutAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkOut: builder.query<any, { limit?: number }>({
      // query: () => ({
      //   url: "/workout-plan/all-workout-plan",
      //   method: "GET",
      // }),
      query: ({ limit }) => {
        let queryParams = new URLSearchParams();

        if (limit) queryParams.append("limit", limit.toString());

        return `workout-plan/all-workout-plan?${queryParams.toString()}`;
      },

      providesTags: ["WorkOut"],
    }),

    // allProductGet: builder.query({
      // query: ({ limit }) => {
      //   let queryParams = new URLSearchParams();

      //   if (limit) queryParams.append("limit", limit.toString());

      //   return `products?${queryParams.toString()}`;
      // },
    //   providesTags: ["Products"],
    // }),


  
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
      query: ({ id, formData }) => ({
        url: `/workout-plan/update-workout-plan/${id}`,
        method: "POST",
        body: formData, // Send formData directly
      }),
      invalidatesTags: ["WorkOut"],
    }),

  }),
});

export const { useGetAllWorkOutQuery, useCreateWorkPlanMutation , useWorkPlanDetailsQuery, useUpdateWorkPlanMutation} = WorkOutAPI;
