"use client";

import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  useGetAllEarningQuery,
  useGetSinglePaymentQuery,
} from "@/redux/features/payment/PaymentAPI";

interface PaymentDetails {
  userId?: {
    _id?: string;
    name?: string;
  };
  user?: {
    name?: string;
  };
  appointmentPrice?: number;
  createdAt?: string;
  transactionId?: string;
  _id?: string;
  transactionDetails?: {
    status?: string;
    last4?: string;
  };
}

const RecentTransection = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [id, setId] = useState("");

  const { data: transaction, isLoading, isError } = useGetAllEarningQuery();
  const { data: singlePayment, isLoading: singlePaymentLoading } =
    useGetSinglePaymentQuery(id);

  const [singleUserPaymentDetails, setSingleUserPaymentDetails] =
    useState<PaymentDetails>({});

  useEffect(() => {
    if (singlePayment?.data) {
      setSingleUserPaymentDetails(singlePayment?.data);
    }
  }, [singlePayment?.data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const showModal = (id?: string) => {
    setId(id || "");
    if (id) {
      setOpen(true);
      // alert(id);
    }
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
      {singleUserPaymentDetails ? (
        <Modal
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <h2 className='text-2xl font-semibold text-[#1A1918] text-center my-3'>
              Transaction Details
            </h2>

            <div className='flex flex-col space-y-4'>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User ID</p>
                <p className='text-lg text-[#737163]'>
                  {singleUserPaymentDetails?.userId?._id ? (
                    singleUserPaymentDetails?.userId?._id
                  ) : (
                    <span>Loading ....</span>
                  )}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>Date</p>
                <p className='text-lg text-[#737163]'>
                  {singleUserPaymentDetails?.createdAt?.split("T")[0] ? (
                    singleUserPaymentDetails?.createdAt?.split("T")[0]
                  ) : (
                    <span>Loading ....</span>
                  )}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  A/C number
                </p>
                <p className='text-lg text-[#737163]'>
                  {singleUserPaymentDetails?.transactionDetails?.last4 ? (
                    <>{`**** **** **** ${singleUserPaymentDetails?.transactionDetails?.last4}`}</>
                  ) : (
                    <span>Loading ....</span>
                  )}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>User Name</p>
                <p className='text-lg text-[#737163]'>
                  {singleUserPaymentDetails?.userId?.name ? (
                    singleUserPaymentDetails?.userId?.name
                  ) : (
                    <span>Loading ....</span>
                  )}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  Transaction Amount
                </p>
                <p className='text-lg text-[#737163]'>
                  $
                  {singleUserPaymentDetails?.appointmentPrice ? (
                    singleUserPaymentDetails?.appointmentPrice
                  ) : (
                    <span>Loading ....</span>
                  )}
                </p>
              </div>
              <div className='flex items-center justify-between border-b pb-2'>
                <p className='text-lg font-medium text-[#1A1918]'>
                  Transaction Status
                </p>
                <p className='text-lg text-[#737163]'>
                  {singleUserPaymentDetails?.transactionDetails?.status ? (
                    singleUserPaymentDetails?.transactionDetails?.status
                  ) : (
                    <span>Loading ....</span>
                  )}
                </p>
              </div>
            </div>
            <button className='bg-[#01336F] hover:bg-[#01336F] text-white py-2 mt-5 mb-2 w-full rounded'>
              Download
            </button>
          </div>
        </Modal>
      ) : (
        <span>loading .....</span>
      )}

      <div className='flex min-h-screen flex-col bg-gray-50 lg:flex-row'>
        <div className='flex flex-1 flex-col'>
          <main className='flex-1 overflow-x-hidden overflow-y-auto p-4 pb-20 lg:pb-4'>
            <div className='space-y-6'>
              <section>
                <h2 className='mb-4 text-lg text-[#1A1918] bg-[#F2F5F7] font-medium lg:text-2xl'>
                  Recent Transactions
                </h2>
                <div className='rounded-lg bg-white shadow-sm'>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-[#002B5B] text-white'>
                        <tr>
                          <th className='px-3 py-3 text-left text-lg text-[#FFFFFF] font-medium'>
                            #Tr.ID
                          </th>
                          <th className='px-3 py-3 text-left text-lg text-[#FFFFFF] font-medium'>
                            User Name
                          </th>
                          <th className='px-3 py-3 text-left text-lg text-[#FFFFFF] font-medium'>
                            Amount
                          </th>
                          <th className='px-3 py-3 text-left text-lg text-[#FFFFFF] font-medium'>
                            Date
                          </th>
                          <th className='px-3 py-3 text-left text-lg text-[#FFFFFF] font-medium'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {transaction?.data?.payments?.map(
                          (user: PaymentDetails) => (
                            <tr key={user._id}>
                              <td className='whitespace-nowrap px-3 py-4 text-lg text-[#1A1918]'>
                                {user.transactionId}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-lg text-[#1A1918]'>
                                {user.user?.name}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-lg text-[#1A1918]'>
                                ${user.appointmentPrice}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-lg text-[#1A1918]'>
                                {user.createdAt?.split("T")[0]}
                              </td>
                              <td>
                                <button>
                                  <Info
                                    className='text-gray-700'
                                    onClick={() => showModal(user?._id)}
                                  />
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default RecentTransection;

