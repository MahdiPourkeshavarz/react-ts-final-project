import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUser } from "../../api/getAccess";
import { AuthformData } from "../../types";
import { AuthenticationForm } from "./components/authForm";
import { useStore } from "../../context/shopStore";

export function AuthenticationPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const { theme } = useStore();

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  async function onSubmit(data: AuthformData) {
    const isActionSuccessful = await submitUser(data, mode);
    if (isActionSuccessful) {
      navigate("/admin");
    }
  }

  return (
    <>
      <div
        className="flex min-h-screen bg-cover"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="flex-1 flex items-center justify-center p-8">
          <div
            className={`rounded-lg shadow-lg p-8 max-w-md w-full
            ${
              theme === "dark"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-black"
            }
            `}
          >
            <header className="mb-6 text-center">
              <h1 className="text-2xl font-bold">به گجت هاب خوش آمدید</h1>
              <p className=" mt-2">همین امروز به ما بپیوندید!</p>
            </header>
            <section className="form-block h-fit transition-transform duration-500 ease-in-out">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {mode === "login" ? "ورود" : "ثبت نام"}
              </h2>
              <div className="text-center mb-4">
                <span className="">
                  {mode === "login"
                    ? "می خواهید حساب ایجاد کنید؟"
                    : "آیا قبلا حساب ایجاد کرده اید؟"}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleMode}
                  >
                    {"  "}ایجا را کلیک کنید
                  </span>
                </span>
              </div>
              <AuthenticationForm mode={mode} onSubmit={onSubmit} />
            </section>
          </div>
        </div>
        <div className="flex-1 hidden md:flex items-center justify-center p-8">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold">
              به جمع خانواده گجت هاب بپیوندید
            </h2>
            <p className="mt-4 text-xl">اینجا کسی دست خالی برنمیگرده!.</p>
          </div>
        </div>
      </div>
    </>
  );
}
