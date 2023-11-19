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

  const expenseCategoryNamesWithAll = [
    { label: "All categories", value: "all" },
    ...expenseCategoryNames,
  ];

  const initialValues = {
    type: "all",
    minAmount: "",
    maxAmount: "",
    date: "",
    comment: "",
  };

  const handleSearchTransactions = async (values) => {
    const formData = {
      type: values.type,
      categories: values.categories.map((category) => category.value),
      minAmount: parseFloat(values.minAmount),
      maxAmount: parseFloat(values.maxAmount),
      date: values.date,
      comment: values.comment,
    };
    console.log(formData);
    // try {
    //   Loading.hourglass();
    //   Loading.remove();
    //   onModalClose();
    // } catch (error) {
    //   console.error(error);
    //   Loading.remove();
    //   onModalClose();
    // }
  };

  return (
    <div className="search-form">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        // validationSchema={transactionValidationSchema}
        onSubmit={handleSearchTransactions}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="search-form__wrapper">
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
            {values.type === "expense" || values.type === "all" ? (
              <div className="transaction-form__react-select react-select">
                <div className="search-form__div">
                  <DropdownSelect
                    name="categories"
                    value={values.categories}
                    options={expenseCategoryNamesWithAll}
                    styles="transaction-form"
                    isMulti={true}
                    isSearchable={!isMobile}
                    placeholder="Select a category"
                    onChange={(selectedOptions) => {
                      console.log(selectedOptions);
                    }}
                  />
                  {touched.categories && errors.categories && (
                    <div className="transaction-form__alert transaction-form__alert--category">
                      {errors.categories}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            <div className="search-form__inputs">
              <Field
                name="minAmount"
                inputMode="decimal"
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
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
              <Field
                name="maxAmount"
                inputMode="decimal"
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
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
            </div>
            <div className="search-form__inputs">
              <Field
                className="search-form__comment"
                type="text"
                name="comment"
                placeholder="Comment"
                initialvalue={initialValues.comment}
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
