import baseAPI from "@/redux/api/baseAPI";
import { create } from "domain";

const NutritionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // getAllNutritions: builder.query<any, void>({
    //   query: ({limit}) => ({
    //     url: `/nutrition/all-nutrition?limit=${limit }`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Nutrition"],
    // }),
    getAllNutritions: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/nutrition/all-nutrition?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Nutrition"],
    }),

    createNutrition: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/nutrition/create-nutrition",
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
    }),

    deleteNutrition: builder.mutation<any, string>({
      query: (id) => ({
        // /nutrition/delete-nutrition
        url: `/nutrition/delete-nutrition/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Nutrition"],
    }),

    updateNutrition: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        // /nutrition/update-nutrition/67b81095e44c76eed20ed60c
        url: `/nutrition/update-nutrition/${id}`,
        method: "POST",
        body: formData,
      }),
    }),

    singleNutrition: builder.query<any, string>({
      query: (id) => ({
        // /nutrition//nutriton-details/67b4304004bb2372b48f4af9
        url: `/nutrition//nutriton-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Nutrition"],
    }),

  }),
});

export const { useGetAllNutritionsQuery, useCreateNutritionMutation, useDeleteNutritionMutation, useUpdateNutritionMutation , useSingleNutritionQuery} =
  NutritionAPI;
