import { useState } from "react";
import { ButtonGroup } from "./components/buttonGroup";
import { DataTable } from "./components/dataTable";

export function AdminPage() {
  const [selected, setSelected] = useState("کالاها");

  return (
    <>
      <div className="myContainer">
        <div className="panelContainer flex flex-col h-32 pt-4 w-full justify-center items-center">
          <p className="text-2xl font-semibold pb-8 text-slate-400">
            پنل ادمین فروشگاه
          </p>
          <ButtonGroup
            options={["کالاها", "موجودی و قیمت ها", "سفارش ها"]}
            selected={selected}
            onSelect={setSelected}
          />
        </div>
        <DataTable selected={selected} />
      </div>
    </>
  );
}
