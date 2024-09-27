import { useState } from "react";
import { Link } from "react-router-dom";

export function ButtonGroup() {
  const [selected, setSelected] = useState("");

  const options = [
    { label: "صفحه اصلی", value: "" },
    { label: "کالاها", value: "products" },
    { label: "موجودی و قیمت ها", value: "inventory" },
    { label: "سفارش ها", value: "orders" },
  ];

  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group" dir="rtl">
      {options.map((option, index) => (
        <Link
          key={option.value}
          to={option.value ? `/admin/${option.value}` : "/admin"}
          className={`px-2 md:text-base md:py-1 md:px-3 sm:text-xs lg:text-lg lg:font-semibold lg:py-2 lg:px-6 py-1 border border-gray-500 font-noraml transition-colors duration-150 focus:outline-none ${
            selected === option.value
              ? "bg-blue-600 text-white"
              : "bg-[#fafdff0e] text-gray-400 hover:bg-gray-200"
          } ${index === 0 ? "rounded-r-lg" : ""} ${
            index === options.length - 1 ? "rounded-l-lg" : ""
          }`}
          onClick={() => setSelected(option.value)}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
