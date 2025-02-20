import baseAPI from "@/redux/api/baseAPI";
import { create } from "domain";

const AppointmentPlanAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointments: builder.query<any, void>({
      query: () => ({
        url: "/appointment/all-appointment",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),

    createAppointment: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/appointment/create-appointment",
        method: "POST",
        body: formData,
      }),
    }),

    

  }),
});

export const { useGetAllAppointmentsQuery, useCreateAppointmentMutation } =
  AppointmentPlanAPI;

export default AppointmentPlanAPI;
