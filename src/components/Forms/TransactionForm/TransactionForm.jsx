import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/session/selectors";
import { selectTransactions } from "../../../redux/finance/selectors";
import { selectTransactionId } from "../../../redux/global/selectors";
import {
  addTransaction,
  updateTransaction,
} from "../../../redux/finance/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import { Switch } from "../../Switch/Switch";
import { Calendar } from "../../Calendar/Calendar";
import { categoryOptions } from "../../../utils/transactionCategories";
import { transactionValidationSchema } from "../../../utils/yupValidationSchemas";
import "./TransactionForm.scss";
/**
 * @param {{ context: 'add' | 'edit' | 'logout', onModalClose: () => void }} props
 */
export const TransactionForm = ({ context, onModalClose }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const allTransactions = useSelector(selectTransactions);
  const transactionId = useSelector(selectTransactionId);

  const [transactionType, setTransactionType] = useState("expense");
  const [transactionCategory, setTransactionCategory] =
    useState("Select a category");

  const selectedTransaction = allTransactions.find(
    (transaction) => transaction._id === transactionId
  );

  useEffect(() => {
    context === "edit"
      ? [
          setTransactionType(selectedTransaction.type),
          setTransactionCategory(selectedTransaction.category),
          setTransactionDate(selectedTransaction.date),
        ]
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  const today = new Date();
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedTodayDate = today.toLocaleDateString("pl-PL", dateOptions);
  const [transactionDate, setTransactionDate] = useState(formattedTodayDate);

  const handleNewDate = (newDate) => {
    if (newDate !== null) {
      const day = newDate.getDate();
      const month = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      const dateString =
        (day < 10 ? "0" : "") +
        day +
        "." +
        (month < 10 ? "0" : "") +
        month +
        "." +
        year;
      setTransactionDate(dateString);
    }
  };

  const handleTransactionTypeChange = () => {
    transactionType === "expense"
      ? setTransactionType("income")
      : [
          setTransactionType("expense"),
          setTransactionCategory("Select a category"),
        ];
  };

  const handleAddTransaction = async (values) => {
    const formData = {
      type: transactionType,
      category: transactionType === "income" ? "Income" : transactionCategory,
      amount: values.amount,
      date: transactionDate,
      comment: values.comment,
      owner: user.id,
    };
    await dispatch(addTransaction(formData)).unwrap();
    onModalClose();
  };

  const handleEditTransaction = async (values) => {
    const formData = {
      transactionId: selectedTransaction._id,
      type: selectedTransaction.type,
      category:
        selectedTransaction.type === "income" ? "Income" : transactionCategory,
      amount: values.amount,
      date: transactionDate,
      comment: values.comment,
      owner: selectedTransaction.owner,
    };
    await dispatch(updateTransaction(formData)).unwrap();
    onModalClose();
  };

  const initialValues = {
    type: context === "edit" ? selectedTransaction.type : transactionType,
    category:
      context === "edit"
        ? {
            label: selectedTransaction.category,
            value: selectedTransaction.category,
          }
        : { label: transactionCategory, value: transactionCategory },
    amount: context === "edit" ? selectedTransaction.amount : "",
    date: context === "edit" ? selectedTransaction.date : transactionDate,
    comment: context === "edit" ? selectedTransaction.comment : "",
  };

  const spanIncomeClass = transactionType === "income" ? "--income" : "";
  const spanExpenseClass = transactionType === "expense" ? "--expense" : "";

  return (
    <div className="transaction-form">
      <Formik
        initialValues={initialValues}
        validationSchema={transactionValidationSchema}
        onSubmit={
          context === "add" ? handleAddTransaction : handleEditTransaction
        }
        enableReinitialize={true}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className="transaction-form__wrapper">
            <div className="transaction-form__type type">
              <span className={`type__span type__span${spanIncomeClass}`}>
                Income
              </span>
              {context === "add" ? (
                <Switch
                  onChange={(event) => {
                    handleTransactionTypeChange(event);
                    setFieldValue("type", transactionType);
                    setFieldValue("category", transactionCategory);
                  }}
                />
              ) : (
                <p className="type__slash">/</p>
              )}
              <span className={`type__span type__span${spanExpenseClass}`}>
                Expense
              </span>
            </div>
            {transactionType === "expense" ? (
              <div className="transaction-form__react-select react-select">
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="category"
                  options={categoryOptions}
                  value={values.category}
                  onChange={(selectedOption) => {
                    handleChange("category")(selectedOption.value);
                    setFieldValue("category", selectedOption);
                    setTransactionCategory(selectedOption.value);
                  }}
                  onBlur={() => setFieldTouched("category", true)}
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
                pattern="[0-9]+([,\\.][0-9]+)?"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9,\\.]/g, "");
                  e.target.value = e.target.value.replace(/,/g, ".");
                  setFieldValue(e.target.value);
                }}
                className="transaction-form__amount"
                placeholder="0.00"
                initialvalue={initialValues.amount}
                autoComplete="amount"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
              <Calendar
                transactionType={transactionType}
                transactionDate={transactionDate}
                onChange={handleNewDate}
              />
              {touched.date && errors.date && (
                <div className="transaction-form__alert transaction-form__alert--date">
                  {errors.date}
                </div>
              )}
            </div>
            <div className="transaction-form__comment">
              <Field
                className="transaction-form__textarea"
                type="text"
                name="comment"
                placeholder="Comment"
                initialvalue={initialValues.comment}
                autoComplete="comment"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="transaction-form__alert transaction-form__alert--comment"
              />
            </div>
            <Button
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
  context: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
