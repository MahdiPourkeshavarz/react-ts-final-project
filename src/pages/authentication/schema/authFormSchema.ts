import * as yup from "yup";

export const formSchema = yup
  .object({
    username: yup
      .string()
      .required("نام کاربری لازم است")
      .typeError("حروف نوشتاری وارد کنید"),
    password: yup.string().when("mode", {
      is: "login",
      then: (schema) => schema.required("رمز عبور لازم است"),
    }),
    createpassword: yup.string().when("mode", {
      is: "signup",
      then: (schema) => schema.required("رمز عبور لازم است"),
    }),
    repeatpassword: yup
      .string()
      .oneOf(
        [yup.ref("createpassword")],
        "تکرار رمز عبور باید همانند رمز عبور باشد"
      )
      .nullable(),
  })
  .required();

export type AuthSchemaType = yup.InferType<typeof formSchema>;
