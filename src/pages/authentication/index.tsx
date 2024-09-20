import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUser } from "../../api/getAccess";
import { AuthformData } from "../../types";
import { AuthenticationForm } from "./components/authForm";

export function AuthenticationPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

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
        style={{ backgroundImage: "url('/windows4.jpg')" }}
      >
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <header className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                به گجت هاب خوش آمدید
              </h1>
              <p className="text-gray-600 mt-2">همین امروز به ما بپیوندید!</p>
            </header>
            <section className="form-block h-fit transition-transform duration-500 ease-in-out">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {mode === "login" ? "ورود" : "ثبت نام"}
              </h2>
              <div className="text-center mb-4">
                <span className="text-gray-600">
                  {mode === "login" ? "Don't" : "Already"} have an account?
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleMode}
                  >
                    {"  "}ایجا را کلیک کنید
                  </span>
                  <button
                    className="text-blue-500 ml-1 transition-transform duration-300 transform hover:scale-105"
                    onClick={toggleMode}
                  >
                    &#8594;
                  </button>
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
            <p className="mt-4">اینجا کسی دست خالی برنمیگرده!.</p>
          </div>
        </div>
      </div>
    </>
  );
}
