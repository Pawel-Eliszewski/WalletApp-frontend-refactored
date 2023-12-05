import { object, string, number, ref } from "yup";
import { formattedTransactionDate } from "./dateHandlers";
import { FormattedMessage } from "react-intl";

const isNullOrUndefined = (value) => value === null || value === undefined;

export const loginValidationSchema = object().shape({
  email: string()
    .email(<FormattedMessage id="invalidEmail" />)
    .required(<FormattedMessage id="emailRequired" />),
  password: string()
    .min(6, <FormattedMessage id="passwordMinLength" />)
    .max(12, <FormattedMessage id="passwordMaxLength" />)
    .required(<FormattedMessage id="passwordRequired" />),
});

export const registerValidationSchema = object().shape({
  email: string()
    .email(<FormattedMessage id="invalidEmail" />)
    .required(<FormattedMessage id="emailRequired" />),
  password: string()
    .min(6, <FormattedMessage id="passwordMinLength" />)
    .max(12, <FormattedMessage id="passwordMaxLength" />)
    .required(<FormattedMessage id="passwordRequired" />),
  confirmPassword: string()
    .oneOf(
      [ref("password"), null],
      <FormattedMessage id="passwordsMustMatch" />
    )
    .required(<FormattedMessage id="confirmPasswordRequired" />),
  name: string()
    .max(10, <FormattedMessage id="nameMaxLength" />)
    .required(<FormattedMessage id="nameRequired" />),
});

export const transactionValidationSchema = object().shape({
  type: string()
    .oneOf(["income", "expense"])
    .required(<FormattedMessage id="typeRequired" />),
  category: object().when("type", {
    is: "expense",
    then: () =>
      object()
        .test(
          "isValidCategory",
          <FormattedMessage id="categoryRequired" />,
          (value) => {
            return value.value !== "Select a category";
          }
        )
        .required(<FormattedMessage id="categoryRequired" />),
    otherwise: () => object(),
  }),
  amount: number().required(<FormattedMessage id="amountRequired" />),
  date: string()
    .required(<FormattedMessage id="dateRequired" />)
    .test(
      "is-valid-date",
      <FormattedMessage id="invalidDateFormat" />,
      function (value) {
        if (!value) return true;
        const parsedDate = formattedTransactionDate(value);
        return parsedDate !== null;
      }
    ),
  comment: string().max(34, <FormattedMessage id="commentMaxLength" />),
});

export const transactionsFiltersValidationSchema = object().shape({
  minAmount: number().test(
    "minAmount",
    <FormattedMessage id="minAmountValidation" />,
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
    <FormattedMessage id="maxAmountValidation" />,
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
    <FormattedMessage id="minDateValidation" />,
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
    <FormattedMessage id="maxDateValidation" />,
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
