import baseAPI from "@/redux/api/baseAPI";

const SubscriptionAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => ({
        url: "/subscription/get-all-subscription",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetAllSubscriptionQuery } = SubscriptionAPI;
