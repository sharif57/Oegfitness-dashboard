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
  }),
});

export const { useGetAllWorkOutQuery } = WorkOutAPI;
