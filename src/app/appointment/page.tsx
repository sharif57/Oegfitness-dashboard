
"use client";
import React, { useState } from "react";
import { useGetAllBookAppointmentsQuery } from "@/redux/features/appointmentPlan/AppointmentPlanAPI";
import { Modal } from "antd";

interface Appointment {
  _id: string;
  name: string;
  age: number;
  gender: string;
  description: string;
  selectedDate: string;
  selectedTime: string;
  paymentAmount: number;
  paymentStatus: string;
  appointmentId: {
    _id: string;
    title: string;
    image: string;
    description: string[];
    price: number;
    availableTimes: string[];
    status: boolean;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface APIResponse {
  success: boolean;
  message: string;
  data: {
    totalAppointments: number;
    totalPages: number;
    currentPage: number;
    appointments: Appointment[];
  };
}

const AppointmentList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllBookAppointmentsQuery();
  const IMAGE = process.env.NEXT_PUBLIC_API_KEY;

  // State for Modal
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  if (isLoading)
    return <p className="text-center text-gray-700">Loading appointments...</p>;
  if (isError || !data?.success)
    return <p className="text-center text-red-600">Failed to fetch appointments.</p>;

  const appointments: Appointment[] = data.data.appointments;

  // Open Modal with Appointment Details
  const showDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  // Close Modal
  const handleCancel = () => {
    setOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">Booked Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`${IMAGE}${appointment.appointmentId.image}`}
              alt={appointment.appointmentId.title}
              className="w-full h-[328px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{appointment.appointmentId.title}</h3>
              <p className="text-gray-600">{appointment.description}</p>
              <button
                className="mt-3 w-full border border-gray-300 py-2 text-center rounded-md hover:bg-gray-100 transition"
                onClick={() => showDetails(appointment)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-4 text-gray-700">
        <span className="font-semibold">Total: {data.data.totalAppointments}</span>
      </div>

      {/* MODAL */}
      <Modal
        title="Appointment Details"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedAppointment && (
          <div>
            <h2 className="text-2xl font-semibold text-center my-3">
              {selectedAppointment.appointmentId.title}
            </h2>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">User Name:</p>
                <p className="text-lg">{selectedAppointment.name}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">Email:</p>
                <p className="text-lg">{selectedAppointment.userId.email}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">Phone:</p>
                <p className="text-lg">{selectedAppointment.userId.phone}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">Date:</p>
                <p className="text-lg">{selectedAppointment.selectedDate}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">Time:</p>
                <p className="text-lg">{selectedAppointment.selectedTime}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">Amount Paid:</p>
                <p className="text-lg">${selectedAppointment.paymentAmount}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="text-lg font-medium">Payment Status:</p>
                <p className={`text-lg ${selectedAppointment.paymentStatus === "COMPLETED" ? "text-green-600" : "text-red-600"}`}>
                  {selectedAppointment.paymentStatus}
                </p>
              </div>
            </div>

            <button
              className="bg-[#01336F]  text-white py-2 mt-5 mb-2 w-full rounded"
              onClick={handleCancel}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentList;
