import baseAPI from "@/redux/api/baseAPI";

const ExerciseAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllExercises: builder.query<any,  { limit?: number }>({
      // query: () => ({
      //   url: "/exercise/all-exercise",
      //   method: "GET",
      // }),
      query: ({ limit }) => {
        let queryParams = new URLSearchParams();

        if (limit) queryParams.append("limit", limit.toString());

        return `exercise/all-exercise?${queryParams.toString()}`;
      },
      providesTags: ["Exercise"],
    }),
    // getAllWorkOut: builder.query<any, { limit?: number }>({
    //   // query: () => ({
    //   //   url: "/workout-plan/all-workout-plan",
    //   //   method: "GET",
    //   // }),
      // query: ({ limit }) => {
      //   let queryParams = new URLSearchParams();

      //   if (limit) queryParams.append("limit", limit.toString());

      //   return `workout-plan/all-workout-plan?${queryParams.toString()}`;
      // },

    //   providesTags: ["WorkOut"],
    // }),

    postExercise: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/exercise/create-exercise",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Exercise"],
    }),
  }),
});

export const { useGetAllExercisesQuery, usePostExerciseMutation } = ExerciseAPI;

export default ExerciseAPI;
