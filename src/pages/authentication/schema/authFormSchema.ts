import * as yup from "yup";

export const formSchema = yup
  .object({
    username: yup
      .string()
      .required("username is required")
      .typeError("Must be a string"),
    password: yup.string().when("mode", {
      is: "login",
      then: (schema) => schema.required("Password is required"),
    }),
    createpassword: yup.string().when("mode", {
      is: "signup",
      then: (schema) => schema.required("Password is required"),
    }),
    repeatpassword: yup
      .string()
      .oneOf([yup.ref("createpassword")], "Passwords must match")
      .nullable(),
  })
  .required();

export type AuthSchemaType = yup.InferType<typeof formSchema>;

