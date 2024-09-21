import { useState } from "react";
import { API_ROUTES } from "../../../../constants";
import { useStore } from "../../../../context/shopStore";
import { useGetData } from "../../../../hooks/useGetAction";
import { TAllOrderResponse } from "../../../../types";

export function OrdersPage() {
  const [page, setPage] = useState(1);
  const { theme } = useStore();
  const endpoint = `${API_ROUTES.ORDERS_BASE}?page=${page}&limit=4`;

  const { data } = useGetData<TAllOrderResponse>(endpoint);

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
      <table
        className={`min-w-full ${
          theme === "dark"
            ? "bg-slate-800 text-blue-400"
            : "bg-slate-200 text-slate-700"
        }`}
      >
        <thead>
          <tr>
            <th className="py-3 text-right pr-3">تاریخ ثبت</th>
            <th className="py-3 text-right pr-3">تاریخ تحویل</th>
            <th className="py-3 text-right pr-3">جمع کل</th>
            <th className="py-3 text-right pr-3">عملیات ها</th>
          </tr>
        </thead>
        <tbody className="h-20">
          {data?.data?.orders?.map((order) => (
            <tr key={order._id} className="hover:bg-[#bcc3c921]">
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
              <td className="px-3 py-4">{order.totalPrice}</td>
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
