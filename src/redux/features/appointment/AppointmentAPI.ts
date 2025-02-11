import baseAPI from "@/redux/api/baseAPI";

const AppointmentAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointments: builder.query<any, void>({
      query: () => ({
        url: "/appointment/all-appointment",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
  }),
});

export const { useGetAllAppointmentsQuery } = AppointmentAPI;

export default AppointmentAPI;