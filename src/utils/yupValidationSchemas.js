import { object, string, number, ref } from "yup";
import { formattedTransactionDate } from "./dateHandlers";

const isNullOrUndefined = (value) => value === null || value === undefined;

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
    .max(10, "First name must not exceed 10 characters")
    .required("First name is required"),
});

export const transactionValidationSchema = object().shape({
  type: string().oneOf(["income", "expense"]).required("Type is required"),
  category: object().when("type", {
    is: "expense",
    then: () =>
      object()
        .test("isValidCategory", "Category is required", (value) => {
          return value.value !== "Select a category";
        })
        .required("Category is required"),
    otherwise: () => object(),
  }),
  amount: number().required("Amount is required"),
  date: string()
    .required("Date is required")
    .test("is-valid-date", "Invalid date format", function (value) {
      if (!value) return true;
      const parsedDate = formattedTransactionDate(value);
      return parsedDate !== null;
    }),
  comment: string().max(34, "Comment must be less than 34 characters"),
});

export const transactionsFiltersValidationSchema = object().shape({
  minAmount: number().test(
    "minAmount",
    "Min must be less than or equal to Max",
    function (value) {
      const { maxAmount } = this.parent;
      return (
        isNullOrUndefined(value) ||
        isNullOrUndefined(maxAmount) ||
        value <= maxAmount
      );
    }
  ),

  maxAmount: number().test(
    "maxAmount",
    "Max must be greater than or equal to Min",
    function (value) {
      const { minAmount } = this.parent;
      return (
        isNullOrUndefined(value) ||
        isNullOrUndefined(minAmount) ||
        value >= minAmount
      );
    }
  ),

  minDate: string().test(
    "minDate",
    "'From' must be earlier than or equal to 'to'",
    function (value) {
      const { maxDate } = this.parent;
      const parsedMinDate = formattedTransactionDate(value);
      const parsedMaxDate = formattedTransactionDate(maxDate);

      return (
        isNullOrUndefined(parsedMinDate) ||
        isNullOrUndefined(parsedMaxDate) ||
        parsedMinDate <= parsedMaxDate
      );
    }
  ),

  maxDate: string().test(
    "maxDate",
    "'To' must be later than or equal to 'from'",
    function (value) {
      const { minDate } = this.parent;
      const parsedMinDate = formattedTransactionDate(minDate);
      const parsedMaxDate = formattedTransactionDate(value);

      return (
        isNullOrUndefined(parsedMinDate) ||
        isNullOrUndefined(parsedMaxDate) ||
        parsedMaxDate >= parsedMinDate
      );
    }
  ),
});
