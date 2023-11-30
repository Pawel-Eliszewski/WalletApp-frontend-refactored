import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useMedia } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/session/selectors";
import {
  selectTransactions,
  selectTransactionId,
} from "../../../redux/finance/selectors";
import {
  selectContext,
  selectIsModalOpen,
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
import { expenseCategoryNames } from "../../../utils/transactionCategories";
import { formattedTodayDate } from "../../../utils/dateHandlers";
import { transactionValidationSchema } from "../../../utils/yupValidationSchemas";
import { Loading } from "notiflix";
/**
 * @param {{ onModalClose: () => void }} props
 */
export const TransactionForm = ({ onModalClose }) => {
  const dispatch = useDispatch();
  const isMobile = useMedia("(max-width: 767px)");
  const formikRef = useRef();
  const context = useSelector(selectContext);
  const user = useSelector(selectUser);
  const isModalOpen = useSelector(selectIsModalOpen);
  const allTransactions = useSelector(selectTransactions);
  const transactionId = useSelector(selectTransactionId);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, [isModalOpen]);

  const selectedTransaction = allTransactions.find(
    (transaction) => transaction._id === transactionId
  );

  const initialValues = {
    type: context === "edit" ? selectedTransaction.type : "expense",
    category:
      context === "edit"
        ? {
            label: selectedTransaction.category,
            value: selectedTransaction.category,
          }
        : { label: "Select a category", value: "Select a category" },
    amount: context === "edit" ? selectedTransaction.amount : "",
    date: context === "edit" ? selectedTransaction.date : formattedTodayDate,
    comment: context === "edit" ? selectedTransaction.comment : "",
  };

  const handleAddTransaction = async (values) => {
    const formData = {
      type: values.type,
      category: values.type === "income" ? "Income" : values.category.value,
      amount: parseFloat(values.amount),
      date: values.date,
      comment: values.comment.trim(),
      owner: user.id,
    };
    try {
      Loading.hourglass();
      await dispatch(addTransaction(formData)).unwrap();
      onModalClose();
      Loading.remove();
    } catch (error) {
      onModalClose();
      Loading.remove();
      console.error(error);
    }
  };

  const handleEditTransaction = async (values) => {
    const formData = {
      transactionId: selectedTransaction._id,
      type: selectedTransaction.type,
      category:
        selectedTransaction.type === "income"
          ? "Income"
          : values.category.value,
      amount: parseFloat(values.amount),
      date: values.date,
      comment: values.comment.trim(),
      owner: selectedTransaction.owner,
    };
    try {
      Loading.hourglass();
      await dispatch(updateTransaction(formData)).unwrap();
      onModalClose();
      Loading.remove();
    } catch (error) {
      onModalClose();
      Loading.remove();
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
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form className="transaction-form__wrapper">
            <div className="transaction-form__type type">
              <span
                className={`type__span ${
                  values.type === "income" ? "type__span--income" : ""
                }`}
              >
                Income
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
                Expense
              </span>
            </div>
            {values.type === "expense" ? (
              <div className="transaction-form__react-select react-select">
                <DropdownSelect
                  name="category"
                  options={expenseCategoryNames}
                  value={values.category}
                  styles="transaction-form"
                  isSearchable={!isMobile}
                  onChange={(selectedOption) => {
                    handleChange("category")(selectedOption.value);
                    setFieldValue("category", selectedOption);
                  }}
                />
                {touched.category && errors.category && (
                  <div className="transaction-form__alert transaction-form__alert--category">
                    {errors.category}
                  </div>
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
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
              <Calendar
                id="transaction-form"
                transactionType={values.type}
                transactionDate={values.date}
                isMobile={isMobile}
                onDateChange={(newDate) => {
                  setFieldValue("date", newDate);
                }}
              />
              {touched.date && errors.date && (
                <div className="transaction-form__alert transaction-form__alert--date">
                  {errors.date}
                </div>
              )}
            </div>
            <div className="transaction-form__comment">
              <Field
                as="textarea"
                className="transaction-form__textarea"
                type="text"
                name="comment"
                placeholder="Comment"
                initialvalue={initialValues.comment}
                autoComplete="off"
                maxLength="34"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="transaction-form__alert transaction-form__alert--comment"
              />
            </div>
            <Button
              ariaLabel={
                context === "add"
                  ? "add transaction"
                  : "save changes in transaction"
              }
              title={context === "add" ? "Add" : "Save"}
              styles="--submit"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

TransactionForm.propTypes = {
  onModalClose: PropTypes.func.isRequired,
};
