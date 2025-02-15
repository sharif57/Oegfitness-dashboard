import baseAPI from "@/redux/api/baseAPI";

const OverviewAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTotalEarning: builder.query<any, void>({
      query: () => ({
        url: "/payment/all-payment",
        method: "GET",
      }),
      providesTags: ["Overview"],
    }),

    getTotalUser: builder.query<any, void>({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
      }),
      providesTags: ["Overview"],
    }),

    getTotalSubscription: builder.query<any, void>({
      query: () => ({
        url: "/subscription/all-subscription",
        method: "GET",
      }),
      providesTags: ["Overview"],
    }),
  }),
});

export const {
  useGetTotalEarningQuery,
  useGetTotalUserQuery,
  useGetTotalSubscriptionQuery,
} = OverviewAPI;
