import baseAPI from "@/redux/api/baseAPI";

const NotificationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query<any, void>({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      providesTags: ["WorkOut"],
    }),

  

  }),
});

export const { useNotificationQuery } = NotificationApi;
