'use client'
import { useNotificationQuery } from '@/redux/features/notification/NotificationApi';
import React from 'react';

interface Notification {
  _id: string;
  message: string;
  patientName: string;
  createdAt: string;
}

const NotificationPage: React.FC = () => {
  const { data } = useNotificationQuery(undefined);

  if (!data || !data.data || data.data.result.length === 0) {
    return <div className="text-center text-xl text-gray-600">No notifications available.</div>;
  }

  const notifications: Notification[] = data.data.result;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Customize this date format as per your preference
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-start text-blue-600 mb-6">Your Notifications</h2>
      <div className="space-y-6">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="font-medium text-xl text-gray-800">{notification.message}</div>
            <div className="text-sm text-gray-500 mt-2">Patient: {notification.patientName}</div>
            <div className="text-xs text-gray-400 mt-2">Received on: {formatDate(notification.createdAt)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
