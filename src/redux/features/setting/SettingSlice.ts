import baseAPI from "@/redux/api/baseAPI";

const SubscriptionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    privacyGet: builder.query({
      query: () => ({
        url: "/privacy",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    updatePrivacy: builder.mutation({
      query: (updatedData) => ({
        url: "/privacy/update-privacy",
        method: "POST",
        body: updatedData,
      }),
      invalidatesTags: ["Subscription"], // Invalidate the Privacy tag after mutation
    }),

    // About Us API
    aboutGet: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    updateAbout: builder.mutation({
      query: (updatedData) => ({
        url: "/about/update-about",
        method: "POST",
        body: updatedData,
      }),
      invalidatesTags: ["Subscription"], // Invalidate the Privacy tag after mutation
    }),

    // /terms and conditions api

    termsGet: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    updateTerms: builder.mutation({
      query: (updatedData) => ({
        url: "/terms/update-terms-condition",
        method: "POST",
        body: updatedData,
      }),
      invalidatesTags: ["Subscription"], // Invalidate the Privacy tag after mutation
    }),
  }),
});

export const {
  usePrivacyGetQuery,
  useUpdatePrivacyMutation,
  useAboutGetQuery,
  useUpdateAboutMutation,
  useTermsGetQuery,
  useUpdateTermsMutation
} = SubscriptionAPI;
