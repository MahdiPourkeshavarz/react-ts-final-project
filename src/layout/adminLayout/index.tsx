import { Outlet } from "react-router-dom";
import { ButtonGroup } from "../../pages/admin/components/buttonGroup";

export function AdminLayout() {
  return (
    <>
      <div className="myContainer">
        <div className="panelContainer flex flex-col h-32 pt-4 w-full justify-center items-center">
          <p className="text-2xl font-semibold pb-8 text-slate-400">
            پنل ادمین فروشگاه
          </p>
          <ButtonGroup />
        </div>
        <Outlet />
      </div>
    </>
  );
}
