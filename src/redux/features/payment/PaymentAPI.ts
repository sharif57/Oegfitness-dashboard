import baseAPI from "@/redux/api/baseAPI";

const EarningAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSinglePayment: builder.query<any, string>({
      query: (id) => ({
        url: `/payment/payment-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Earning"],
    }),
    getAllEarning: builder.query<any, void>({
      query: () => ({
        url: "/payment/all-payment",
        method: "GET",
      }),
      providesTags: ["Earning"],
    }),
  }),
});

export const { useGetAllEarningQuery, useGetSinglePaymentQuery } = EarningAPI;
