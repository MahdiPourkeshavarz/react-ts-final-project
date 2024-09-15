import { toast } from "react-toastify";
import { API_ROUTES } from "../constants";
import { httpRequest } from "../lib/axiosConfig";
import { AuthformData } from "../types";

export async function submitUser(formdata: AuthformData, mode: string) {
  const url = mode === "login" ? API_ROUTES.AUTH_LOGIN : API_ROUTES.AUTH_SIGNUP;
  const username = formdata.username;
  const password = formdata.password;
  const createpassword = formdata.createpassword;
  try {
    if (mode === "login") {
      const response = await httpRequest.post(url, {
        username,
        password,
      });
      const accessToken = await response.data.access;
      const refreshToken = await response.data.refresh;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return true;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
await httpRequest.post(url, {
  username,
  password: createpassword,
});
      toast.success("Account created! Now Login!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    // toast.error(`somthing went wrong!`, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }
}
