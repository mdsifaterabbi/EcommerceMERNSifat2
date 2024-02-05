import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState(null); // Add error handling
  const [paymentSt, setPaymentSt] = useState(null);

  const ResetOrderPage = async () => {
    const res = await axios.post(
      `http://localhost:3000/api/v1/order/findPaidProducts/${tranId}`
    );

    localStorage.removeItem("findPaidProducts");
    localStorage.setItem("findPaidProducts", JSON.stringify(res?.data));
    window.location.reload(false); //reload from the cache
  };

  // useEffect(() => {
  //   ResetOrderPage();
  // }, []);

  const storedPaidItem = JSON.parse(localStorage.getItem("findPaidProducts"));

  console.log(storedPaidItem);

  const updatePaymentStatus = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/order/update-payment-status/${tranId}`
      );
      // if (data?.success) {
      //   setPaymentSt(data?.paymentStatus);
      // }
      ResetOrderPage();
    } catch (error) {
      console.log(
        "Error occurred in updatePaymentStatus in PaymentSuccess page"
      );
    }
  };

  // useEffect(() => {
  //   updatePaymentStatus();
  // }, [tranId]);

  return (
    <Layout>
      <div className="min-h-[80vh]">
        <button
          className="btn btn-sm btn-accent"
          onClick={() => {
            ResetOrderPage();
          }}
        >
          Update Order Page
        </button>
        <button
          className="btn btn-sm btn-accent"
          onClick={() => {
            updatePaymentStatus();
          }}
        >
          Update Payment Status
        </button>
        <div className="block sm:hidden px-[20px]">
          <h1 className="text-center mb-[5px]">
            Customer Information small device
          </h1>
          <h3 className="bg-slate-800 py-[5px] pl-[5px] text-[14px] text-[#c7d6ed]">
            Name: {storedPaidItem?.customerName}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-600 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Email: {storedPaidItem?.customerEmail}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-800 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Phone: {storedPaidItem?.customerPhone}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-600 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Address: {storedPaidItem?.shippingAddress}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-800 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Order Placed: {storedPaidItem?.createdAt}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-600 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Order Update Time: {storedPaidItem?.updatedAt}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
        </div>
        <br></br>
        <div className="block sm:hidden px-[20px]">
          <h1 className="text-center mb-[5px]">Order Details</h1>
          <h3 className="bg-slate-800 py-[5px] pl-[5px] text-[14px] text-[#c7d6ed]">
            Transaction id: {storedPaidItem?.tranId}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-600 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            order id is: {storedPaidItem?.orderId}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-800 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Total Price: {storedPaidItem?.totalPrice}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-600 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Quantity: {storedPaidItem?.totalProducts}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
          <h3 className="bg-slate-800 text-[#c7d6ed] text-[14px] py-[5px] pl-[5px]">
            Payment Status:
            {/* {orderResult?.paymentStatus === 0 ? (
              <span className="badge badge-warning">Not Paid</span>
            ) : (
              <span className="badge badge-success">Paid</span>
            )} */}
            {storedPaidItem?.paymentStatus}
          </h3>
          <hr className="border-[1px] border-slate-300"></hr>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="basis-1/1 text-center hidden sm:block">
            <h1 className="italic font-semibold mb-[5px]">
              Customer Information
            </h1>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    Name
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    Email
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    Phone
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    Address
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    CreatedAt
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    UpdatedAt
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    {storedPaidItem?.customerName}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    {storedPaidItem?.customerEmail}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    {storedPaidItem?.customerPhone}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    {storedPaidItem?.shippingAddress}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    {storedPaidItem?.createdAt}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    {storedPaidItem?.updatedAt}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="basis-1/1 text-center hidden sm:block">
            <h1 className="italic font-semibold mb-[5px]">Order Details</h1>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    Transaction Id
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    Order Id
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    Total Price
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    Quantity
                  </th>
                  <th className="border border-r-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    Payment Status Big
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    {tranId}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    {storedPaidItem?.orderId}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    {storedPaidItem?.totalPrice}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-600 text-white">
                    {storedPaidItem?.totalProducts}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center bg-slate-800 text-white">
                    {storedPaidItem?.paymentStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
