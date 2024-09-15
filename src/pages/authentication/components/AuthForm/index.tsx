import { useForm } from "react-hook-form";
import { AuthformData } from "../../../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchemaType, formSchema } from "../../schema/authFormSchema";

interface Props {
  mode: string;
  onSubmit: (data: AuthformData) => void;
}

export const AuthenticationForm = ({ mode, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`transition-transform duration-500 ${
        mode === "login" ? "scale-100" : "scale-95"
      }`}
    >
      <div className="space-y-4">
        {mode === "login" && (
          <div className="form-group transition-opacity duration-500 space-y-4">
            <input
              type="string"
              id="string"
              placeholder="User Name"
              disabled={mode === ("signup" as unknown)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("username")}
            />
            <p className="text-red-500">{errors.username?.message}</p>

            <input
              type="password"
              id="password"
              placeholder="Password"
              disabled={mode === ("signup" as unknown)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
        )}

        {mode === "signup" && (
          <div className="form-group transition-opacity duration-500 space-y-4">
            <input
              type="string"
              id="name"
              placeholder="User Name"
              disabled={mode === ("login" as unknown)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("username")}
            />
            <p className="text-red-500">{errors.username?.message}</p>

            <input
              type="password"
              id="createpassword"
              placeholder="Password"
              disabled={mode === ("login" as unknown)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("createpassword")}
            />
            <p className="text-red-500">{errors.createpassword?.message}</p>

            <input
              type="password"
              id="repeatpassword"
              placeholder="Repeat Password"
              disabled={mode === ("login" as unknown)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50"
              {...register("repeatpassword")}
            />
            <p className="text-red-500">{errors.repeatpassword?.message}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded transition duration-300 hover:bg-blue-700"
          type="submit"
        >
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </div>
    </form>
  );
};
