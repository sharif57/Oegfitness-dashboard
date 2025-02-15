import baseAPI from "@/redux/api/baseAPI";

const EarningAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarning: builder.query<any, void>({
      query: () => ({
        url: "/payment/all-payment",
        method: "GET",
      }),
      providesTags: ["Earning"],
    }),
  }),
});

export const { useGetAllEarningQuery } = EarningAPI;
