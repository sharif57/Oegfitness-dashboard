import baseAPI from "@/redux/api/baseAPI";

const AppointmentPlanAPI = baseAPI.injectEndpoints({
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

export const { useGetAllAppointmentsQuery } = AppointmentPlanAPI;

export default AppointmentPlanAPI;
