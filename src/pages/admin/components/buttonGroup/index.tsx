import { useState } from "react";
import { Link } from "react-router-dom";

export function ButtonGroup() {
  const [selected, setSelected] = useState("products");

  const options = [
    { label: "کالاها", value: "products" },
    { label: "موجودی و قیمت ها", value: "inventory" },
    { label: "سفارش ها", value: "orders" },
  ];

  return (
    <div className="inline-flex rounded-lg shadow-sm" role="group" dir="rtl">
      {options.map((option, index) => (
        <Link
          key={option.value}
          to={`/admin/${option.value}`}
          className={`px-8 py-2 border border-gray-500 text-lg font-semibold transition-colors duration-150 focus:outline-none ${
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
