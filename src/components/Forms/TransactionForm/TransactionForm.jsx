import PropTypes from "prop-types";
import { useIntl, FormattedMessage } from "react-intl";
import { useMedia } from "react-use";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/session/selectors";
import {
  selectTransactions,
  selectTransactionId,
} from "../../../redux/finance/selectors";
import {
  selectContext,
  selectAppLanguage,
} from "../../../redux/global/selectors";
import {
  addTransaction,
  updateTransaction,
} from "../../../redux/finance/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import { Switch } from "../../Switch/Switch";
import { DropdownSelect } from "../../DropdownSelect/DropdownSelect";
import { Calendar } from "../../Calendar/Calendar";
import { expenseCategoryOptions } from "../../../utils/transactionCategories";
import { formattedTodayDate } from "../../../utils/dateHandlers";
import { transactionValidationSchema } from "../../../utils/yupValidationSchemas";
import { Report } from "../../../utils/notiflixStyles";
import {
  notAllowedMessage,
  pleaseRegisterMessage,
} from "../../../utils/notiflixMessages";
/**
 * @param {{ onMenuOpen: () => void, onMenuClose: () => void, onModalClose: () => void }} props
 */
export const TransactionForm = ({ onMenuOpen, onMenuClose, onModalClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isMobile = useMedia("(max-width: 767px)");
  const context = useSelector(selectContext);
  const appLanguage = useSelector(selectAppLanguage);
  const user = useSelector(selectUser);
  const allTransactions = useSelector(selectTransactions);
  const transactionId = useSelector(selectTransactionId);
  const formikRef = useRef();

  const placeholderComment = intl.formatMessage({
    id: "headerComment",
  });

  const selectedTransaction = allTransactions.find(
    (transaction) => transaction._id === transactionId
  );

  const initialValues = {
    type: context === "edit" ? selectedTransaction.type : "expense",
    category:
      context === "edit"
        ? {
            label: (
              <FormattedMessage
                id={`expenseCategories${selectedTransaction.category}`}
              />
            ),
            value: selectedTransaction.category,
          }
        : {
            label: <FormattedMessage id="labelSelectCategory" />,
            value: "Select a category",
          },
    amount: context === "edit" ? selectedTransaction.amount : "",
    date: context === "edit" ? selectedTransaction.date : formattedTodayDate,
    comment: context === "edit" ? selectedTransaction.comment : "",
  };

  const handleTransactionFormClear = () => {
    formikRef.current.resetForm();
    const clearButton = document.querySelector(".btn.btn--cancel");
    !isMobile && clearButton.blur();
  };

  const handleAddTransaction = async (values) => {
    const formData = {
      type: values.type,
      category: values.type === "income" ? 0 : values.category.value,
      amount: parseFloat(values.amount),
      date: values.date,
      comment: values.comment.trim(),
      owner: user.id,
    };
    try {
      if (user.id !== "650f2fb1143d76a0d93a0176") {
        await dispatch(addTransaction(formData)).unwrap();
      } else {
        Report.info(
          notAllowedMessage(appLanguage),
          pleaseRegisterMessage(appLanguage),
          "OK"
        );
      }
      onModalClose();
    } catch (error) {
      onModalClose();
      console.error(error);
    }
  };

  const handleEditTransaction = async (values) => {
    const formData = {
      transactionId: selectedTransaction._id,
      type: selectedTransaction.type,
      category:
        selectedTransaction.type === "income" ? 0 : values.category.value,
      amount: parseFloat(values.amount),
      date: values.date,
      comment: values.comment.trim(),
      owner: selectedTransaction.owner,
    };
    try {
      if (user.id !== "650f2fb1143d76a0d93a0176") {
        await dispatch(updateTransaction(formData)).unwrap();
      } else {
        Report.info(
          notAllowedMessage(appLanguage),
          pleaseRegisterMessage(appLanguage),
          "OK"
        );
      }
      onModalClose();
    } catch (error) {
      onModalClose();
      console.error(error);
    }
  };

  return (
    <div className="transaction-form">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={transactionValidationSchema}
        onSubmit={
          context === "add" ? handleAddTransaction : handleEditTransaction
        }
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
          <Form
            className={
              context === "add"
                ? "transaction-form__wrapper"
                : "transaction-form__wrapper transaction-form__wrapper--edit"
            }
          >
            <div className="transaction-form__type type">
              <span
                className={`type__span ${
                  values.type === "income" ? "type__span--income" : ""
                }`}
              >
                <FormattedMessage id="labelIncome" />
              </span>
              {context === "add" ? (
                <Switch
                  context="transactionType"
                  checked={values.type === "expense" ? true : false}
                  onChange={() => {
                    setFieldValue(
                      "type",
                      values.type === "expense" ? "income" : "expense"
                    );
                  }}
                />
              ) : (
                <p className="type__slash">/</p>
              )}
              <span
                className={`type__span ${
                  values.type === "expense" ? "type__span--expense" : ""
                }`}
              >
                <FormattedMessage id="labelExpense" />
              </span>
            </div>
            {values.type === "expense" ? (
              <div className="transaction-form__react-select react-select">
                <DropdownSelect
                  name="category"
                  options={expenseCategoryOptions}
                  value={values.category}
                  styles="transaction-form"
                  isSearchable={!isMobile}
                  onMenuOpen={onMenuOpen}
                  onMenuClose={onMenuClose}
                  onChange={(selectedOption) => {
                    setFieldValue("category", selectedOption);
                  }}
                />
                {touched.category && errors.category && (
                  <span className="transaction-form__alert transaction-form__alert--category">
                    {errors.category}
                  </span>
                )}
              </div>
            ) : null}
            <div className="transaction-form__inputs">
              <Field
                name="amount"
                type="text"
                inputMode="decimal"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/^0{2,}/, "0")
                    .replace(/^0[^.,]/, "0")
                    .replace(/^[.,]/, "")
                    .replace(/,/g, ".")
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/(\.\d{1,2}).*/g, "$1");
                  setFieldValue("amount", e.target.value);
                }}
                className="transaction-form__amount"
                placeholder="0.00"
                initialvalue={initialValues.amount}
                autoComplete="off"
              />
              <ErrorMessage
                name="amount"
                component="span"
                className="transaction-form__alert transaction-form__alert--amount"
              />
              <Calendar
                id="transaction-form"
                transactionType={values.type}
                transactionDate={values.date}
                isMobile={isMobile}
                onDateChange={(newDate) => {
                  setFieldValue("date", newDate);
                  setFieldTouched("date", true);
                }}
              />
              {touched.date && errors.date && (
                <span className="transaction-form__alert transaction-form__alert--date">
                  {errors.date}
                </span>
              )}
            </div>
            <div className="transaction-form__comment">
              <Field
                as="textarea"
                className="transaction-form__textarea"
                type="text"
                name="comment"
                placeholder={placeholderComment}
                initialvalue={initialValues.comment}
                autoComplete="off"
                maxLength="35"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className="transaction-form__alert transaction-form__alert--comment"
              />
            </div>
            <Button
              ariaLabel={
                context === "add"
                  ? "add transaction"
                  : "save changes in transaction"
              }
              title={
                context === "add" ? (
                  <FormattedMessage id="titleAdd" />
                ) : (
                  <FormattedMessage id="titleSave" />
                )
              }
              styles="--submit"
              type="submit"
            />
          </Form>
        )}
      </Formik>
      {context === "add" && (
        <Button
          ariaLabel="clear all transaction inputs"
          title={<FormattedMessage id="titleClear" />}
          styles="--cancel"
          type="button"
          onClick={handleTransactionFormClear}
        />
      )}
    </div>
  );
};

TransactionForm.propTypes = {
  onMenuOpen: PropTypes.func.isRequired,
  onMenuClose: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
