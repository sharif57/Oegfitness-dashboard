import baseAPI from "@/redux/api/baseAPI";
import { create } from "domain";

const NutritionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllNutritions: builder.query<any, void>({
      query: () => ({
        url: "/nutrition/all-nutrition",
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
  }),
});

export const { useGetAllNutritionsQuery, useCreateNutritionMutation } =
  NutritionAPI;
