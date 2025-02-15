import baseAPI from "@/redux/api/baseAPI";

const NutritionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllNutritions: builder.query<any, void>({
      query: () => ({
        url: "/nutrition/all-nutrition",
        method: "GET",
      }),
      providesTags: ["Nutrition"],
    }),
  }),
});

export const { useGetAllNutritionsQuery } = NutritionAPI;
