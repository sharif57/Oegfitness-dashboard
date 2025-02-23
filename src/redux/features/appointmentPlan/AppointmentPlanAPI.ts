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

    createAppointment: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/appointment/create-appointment",
        method: "POST",
        body: formData,
      }),
    }),

    getAllBookAppointments: builder.query<any, void>({
      query: () => ({
        url: "/book-appointment/all-book-appointment",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),

    updateAppointment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/appointment/update-appointment/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Appointments"],
    }),

    appointmentDetails: builder.query({
      query: (_id) => ({
        url: `/appointment/appointment-details/${_id}`,
        method: "GET",
      }),
    })

  }),
});

export const { useGetAllAppointmentsQuery, useCreateAppointmentMutation , useGetAllBookAppointmentsQuery, useUpdateAppointmentMutation  , useAppointmentDetailsQuery} =
  AppointmentPlanAPI;

export default AppointmentPlanAPI;
