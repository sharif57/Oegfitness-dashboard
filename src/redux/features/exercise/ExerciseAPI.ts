import baseAPI from "@/redux/api/baseAPI";

const ExerciseAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    
    getAllExercises: builder.query<any, void>({
      query: () => ({
        url: "/exercise/all-exercise",
        method: "GET",
      }),
      providesTags: ["Exercise"],
    }),

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
