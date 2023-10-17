import { object, string, ref } from "yup";

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
  comment: string()
    .max(30, "Description must be less than 30 characters")
    .test(
      "remainingCharacters",
      "You have exceeded the character limit",
      function (value) {
        if (value) {
          const maxChars = 30;
          const remainingChars = maxChars - value.length;
          return remainingChars >= 0;
        }
        return true;
      }
    ),
});
