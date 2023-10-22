import { object, string, number, ref } from "yup";

export const loginValidationSchema = object().shape({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters")
    .required("Password is required"),
});

export const registerValidationSchema = object().shape({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirmed password is required"),
  firstName: string()
    .max(12, "First name must not exceed 12 characters")
    .required("First name is required"),
});

export const transactionValidationSchema = object().shape({
  type: string().oneOf(["income", "expense"]).required("Type is required"),
  category: object().when("type", {
    is: "expense",
    then: () =>
      object()
        .test("isValidCategory", "Category is required", (value) => {
          return value.label !== "Select a category";
        })
        .required("Category is required"),
    otherwise: () => object(),
  }),
  amount: number().required("Amount is required"),
  date: string()
    .required("Date is required")
    .test("is-valid-date", "Date format must be DD.MM.YYYY", function (value) {
      if (!value) return true;
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return false;
      const parts = value.split(".");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      // eslint-disable-next-line no-unused-vars
      const year = parseInt(parts[2], 10);
      if (day < 1 || day > 31 || month < 1 || month > 12) return false;
      return true;
    }),
  comment: string().max(34, "Comment must be less than 34 characters"),
});
