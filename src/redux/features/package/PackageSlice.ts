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

    packageDetails: builder.query({
      query: (_id) => ({
        url: `/package/package-details/${_id}`,
        method: "GET",
      }),
      providesTags: ["Earning"], // Marks the fetched data with the "Question" tag
    }),


  }),
});

export const { useGetAllPackageQuery, useUpdatePackageMutation, usePackageDetailsQuery } = EarningAPI;
