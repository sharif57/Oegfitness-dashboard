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

    updatePackage: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/package/update/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Earning"],
    }),

  }),
});

export const { useGetAllPackageQuery, useUpdatePackageMutation } = EarningAPI;
