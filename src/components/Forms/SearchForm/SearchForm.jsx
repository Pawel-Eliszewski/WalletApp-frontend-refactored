import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useMedia } from "react-use";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/finance/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import { DropdownSelect } from "../../DropdownSelect/DropdownSelect";
import { expenseCategoryNames } from "../../../utils/transactionCategories";
// import { transactionValidationSchema } from "../../../utils/yupValidationSchemas";
import { Loading } from "notiflix";
import { filterQueryTransactions } from "../../../utils/transactionsDataOperations";
import { Calendar } from "../TransactionForm/Calendar/Calendar";
/**
 * @param {{ isModalOpen: boolean, context: 'search',
 * onFormClear: () => void, onModalClose: () => void }} props
 */
export const SearchForm = ({ onFormClear, onModalClose }) => {
  const isMobile = useMedia("(max-width: 767px)");
  const formikRef = useRef();
  const allTransactions = useSelector(selectTransactions);

  // useEffect(() => {
  //   if (isModalOpen) {
  //     formikRef.current?.resetForm();
  //   }
  // }, [isModalOpen]);

  const expenseCategoryNamesWithAll = [
    { label: "All categories", value: "all" },
    ...expenseCategoryNames,
  ];

  const initialValues = {
    type: "all",
    categories: [],
    minAmount: "",
    maxAmount: "",
    minDate: "",
    maxDate: "",
    comment: "",
  };

  const handleSearchTransactions = async (values) => {
    const filteredQueryTransactions = filterQueryTransactions(
      allTransactions,
      values
    );
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

  const handleSearchFormClear = () => {
    formikRef.current.resetForm();
  };

  return (
    <div className="search-form">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        // validationSchema={transactionValidationSchema}
        onSubmit={handleSearchTransactions}
        // enableReinitialize={true}
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
            {values.type === "all" || values.type === "expense" ? (
              <div className="transaction-form__react-select react-select">
                <div className="search-form__div">
                  <DropdownSelect
                    name="categories"
                    value={values.categories}
                    options={expenseCategoryNamesWithAll}
                    styles="transaction-form"
                    isMulti={true}
                    isSearchable={!isMobile}
                    isClearable={false}
                    placeholder="Select a category"
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions.map(
                        (option) => option.value
                      );
                      const hasAllCategories = selectedValues.includes("all");
                      if (hasAllCategories) {
                        formikRef.current.setFieldValue(
                          "categories",
                          selectedOptions.filter(
                            (option) => option.value === "all"
                          )
                        );
                      } else {
                        formikRef.current.setFieldValue(
                          "categories",
                          selectedOptions
                        );
                      }
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
              <label className="search-form__label" htmlFor="minAmount">
                Amount min:
              </label>
              <Field
                id="minAmount"
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
                autoComplete="off"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="maxAmount">
                Amount max:
              </label>
              <Field
                id="maxAmount"
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
                autoComplete="off"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="transaction-form__alert transaction-form__alert--amount"
              />
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="minDate">
                Date from:
              </label>
              <div className="search-form__date">
                <Calendar
                  id="minDate"
                  placeholder="DD.MM.YYYY"
                  transactionType={values.type}
                  transactionDate={values.minDate}
                  isMobile={isMobile}
                  onDateChange={(newDate) => {
                    setFieldValue("minDate", newDate);
                  }}
                />
                {touched.date && errors.date && (
                  <div className="transaction-form__alert transaction-form__alert--date">
                    {errors.date}
                  </div>
                )}
              </div>
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="maxDate">
                Date to:
              </label>
              <div className="search-form__date">
                <Calendar
                  id="maxDate"
                  placeholder="DD.MM.YYYY"
                  transactionType={values.type}
                  transactionDate={values.maxDate}
                  isMobile={isMobile}
                  onDateChange={(newDate) => {
                    setFieldValue("maxDate", newDate);
                  }}
                />
                {touched.date && errors.date && (
                  <div className="transaction-form__alert transaction-form__alert--date">
                    {errors.date}
                  </div>
                )}
              </div>
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="maxDate">
                Comment:
              </label>
              <Field
                className="search-form__comment"
                type="text"
                name="comment"
                placeholder="Type word"
                maxLength="34"
                autoComplete="off"
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
            <Button
              ariaLabel="clear filters"
              title="Clear"
              styles="--cancel"
              type="button"
              onClick={handleSearchFormClear}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

SearchForm.propTypes = {
  onFormClear: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
