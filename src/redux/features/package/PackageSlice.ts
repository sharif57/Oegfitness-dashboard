import baseAPI from "@/redux/api/baseAPI";

const EarningAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
   
    getAllPackage: builder.query<any, void>({
      query: () => ({
        url: "/package/all-package",
        method: "GET",
      }),
      providesTags: ["Earning"],
    }),
  }),
});

export const { useGetAllPackageQuery } = EarningAPI;
