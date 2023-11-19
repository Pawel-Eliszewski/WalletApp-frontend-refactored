import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useMedia } from "react-use";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/finance/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import { DropdownSelect } from "../../DropdownSelect/DropdownSelect";
import { expenseCategoryNames } from "../../../utils/transactionCategories";
import { transactionValidationSchema } from "../../../utils/yupValidationSchemas";
import { Loading } from "notiflix";
/**
 * @param {{ isModalOpen: boolean, context: 'search', onModalClose: () => void }} props
 */
export const SearchForm = ({ isModalOpen, onModalClose }) => {
  const isMobile = useMedia("(max-width: 767px)");
  const formikRef = useRef();
  const allTransactions = useSelector(selectTransactions);

  useEffect(() => {
    if (isModalOpen) {
      formikRef.current?.resetForm();
    }
  }, [isModalOpen]);

  const initialValues = {
    type: "all",
    categories: { label: "all", value: "all" },
    minAmount: "",
    maxAmount: "",
    date: "",
    comment: "",
  };

  const handleSearchTransactions = async (values) => {
    const formData = {
      type: values.type.value,
      categories: values.category.value,
      minAmount: parseFloat(values.amount),
      maxAmount: parseFloat(values.amount),
      date: values.date,
      comment: values.comment,
    };
    try {
      Loading.hourglass();
      Loading.remove();
      onModalClose();
    } catch (error) {
      console.error(error);
      Loading.remove();
      onModalClose();
    }
  };

  return (
    <div className="transaction-form">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={transactionValidationSchema}
        onSubmit={handleSearchTransactions}
        enableReinitialize={true}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form className="search-form__wrapper">
            <p>Transactions type</p>
            <div className="search-form__radio-group">
              <label>
                <Field type="radio" name="type" value="all" />
                <span className="type__span"> All</span>
              </label>
              <label>
                <Field type="radio" name="type" value="income" />
                <span className="type__span type__span--income"> Income</span>
              </label>
              <label>
                <Field type="radio" name="type" value="expense" />
                <span className="type__span type__span--expense"> Expense</span>
              </label>
            </div>
            <div className="transaction-form__react-select react-select">
              <p>Transactions categories</p>
              <DropdownSelect
                name="category"
                options={expenseCategoryNames}
                value={values.category}
                styles="transaction-form"
                isMulti={true}
                isSearchable={isMobile ? false : true}
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
            <div className="search-form__inputs">
              <Field
                name="amount"
                inputMode="numeric"
                type="text"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/,/g, ".")
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/(\.\d{1,2}).*/g, "$1");
                  setFieldValue("amount", e.target.value);
                }}
                className="search-form__amount"
                placeholder="0.00"
                initialvalue={initialValues.amount}
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
              <Field
                name="amount"
                inputMode="numeric"
                type="text"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/,/g, ".")
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/(\.\d{1,2}).*/g, "$1");
                  setFieldValue("amount", e.target.value);
                }}
                className="search-form__amount"
                placeholder="0.00"
                initialvalue={initialValues.amount}
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
              {/* <Calendar
                transactionType={values.type}
                transactionDate={values.date}
                onDateChange={(newDate) => {
                  setFieldValue("date", newDate);
                }}
              />
              {touched.date && errors.date && (
                <div className="transaction-form__alert transaction-form__alert--date">
                  {errors.date}
                </div>
              )} */}
            </div>
            <div className="search-form__inputs">
              <Field
                className="search-form__comment"
                type="text"
                name="comment"
                placeholder="Comment"
                initialvalue={initialValues.comment}
                autoComplete="comment"
                maxLength="34"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="transaction-form__alert transaction-form__alert--comment"
              />
            </div>
            <Button
              ariaLabel="submit searching transactions"
              title="Search"
              styles="--submit"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

SearchForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
