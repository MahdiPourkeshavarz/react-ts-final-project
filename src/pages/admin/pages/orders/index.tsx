import { useEffect, useState } from "react";
import { API_ROUTES } from "../../../../constants";
import { useStore } from "../../../../context/shopStore";
import { useGetData } from "../../../../hooks/useGetAction";
import { TAllOrderResponse } from "../../../../types";
import { convertNumberToPersian } from "../../../../utils/dataConverter";
import { useSearchParams } from "react-router-dom";

export function OrdersPage() {
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const [optionValue, setOptionValue] = useState(
    searchParams.get("status") || ""
  );

  const { theme } = useStore();

  const initialEndpoint = `${API_ROUTES.ORDERS_BASE}?page=${page}&limit=4`;

  const [endpoint, setEndpoint] = useState(initialEndpoint);

  const { data } = useGetData<TAllOrderResponse>(endpoint);

  useEffect(() => {
    const deliveryStatus =
      optionValue === "delivered"
        ? "true"
        : optionValue === "notDelivered"
        ? "false"
        : null;
    const newEndpoint = `${API_ROUTES.ORDERS_BASE}${
      deliveryStatus ? `?deliveryStatus=${deliveryStatus}` : ""
    }&page=${page}&limit=4`;
    console.log(newEndpoint);
    setEndpoint(newEndpoint);
  }, [optionValue, page]);

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setOptionValue(newStatus);
    setSearchParams({ status: newStatus });
    setPage(1);
  }

  function handlePageChange(increment: number) {
    if (page == data?.total_pages) {
      return;
    } else if (page === 1 && increment === -1) {
      return;
    }
    setPage((prev) => Math.max(1, prev + increment));
  }

  return (
    <div className="px-4 py-8 flex flex-col">
      <div className="py-2">
        <select
          className={
            theme === "dark"
              ? "bg-slate-900 text-blue-500 px-2 py-1 rounded-lg w-40"
              : "bg-slate-200 px-2 py-1 rounded-lg w-40"
          }
          name="orderStatus"
          id="orderStatus"
          onChange={(e) => {
            handleStatusChange(e);
          }}
        >
          <option value="">دسته بندی</option>
          <option value="delivered">تحویل شده</option>
          <option value="notDelivered">تحویل نشده</option>
        </select>
      </div>
      <table
        className={`min-w-full rounded-lg ${
          theme === "dark"
            ? "bg-slate-800 text-blue-400"
            : "bg-slate-200 text-slate-700"
        }`}
      >
        <thead>
          <tr>
            <th className="py-3 text-right pr-3">سفارش دهنده</th>
            <th className="py-3 text-right pr-3">تاریخ ثبت</th>
            <th className="py-3 text-right pr-3">تاریخ تحویل</th>
            <th className="py-3 text-right pr-3">جمع کل</th>
            <th className="py-3 text-right pr-3">عملیات ها</th>
          </tr>
        </thead>
        <tbody className="h-20">
          {data?.data?.orders?.map((order) => (
            <tr key={order._id} className="hover:bg-[#bcc3c921]">
              <td className="px-3 py-4">{order.user.username}</td>
              <td className="px-3 py-4">
                {new Date(order.updatedAt).toLocaleDateString("fa-IR", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </td>
              <td className="px-3 py-4">
                {new Date(order.createdAt).toLocaleDateString("fa-IR", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </td>
              <td className="px-3 py-4">
                {convertNumberToPersian(order.totalPrice)}
              </td>
              <td className="px-3 py-4">
                <button className="text-blue-500 hover:underline">
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between px-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => handlePageChange(+1)}
        >
          بعدی
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => handlePageChange(-1)}
        >
          قبلی
        </button>
      </div>
    </div>
  );
}
