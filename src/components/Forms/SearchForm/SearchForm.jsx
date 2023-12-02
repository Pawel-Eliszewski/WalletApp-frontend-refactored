import PropTypes from "prop-types";
import { useIntl, FormattedMessage } from "react-intl";
import { useRef } from "react";
import { useMedia } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { selectTransactionsFilters } from "../../../redux/finance/selectors";
import {
  setTransactionsFilters,
  setFilteredTransactions,
} from "../../../redux/finance/financeSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import { DropdownSelect } from "../../DropdownSelect/DropdownSelect";
import { Calendar } from "../../Calendar/Calendar";
import { expenseCategoryNames } from "../../../utils/transactionCategories";
import { transactionsFiltersValidationSchema } from "../../../utils/yupValidationSchemas";
import { Loading, Notify } from "notiflix";
/**
 * @param {{ onModalClose: () => void }} props
 */
export const SearchForm = ({ onModalClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const transactionsFilters = useSelector(selectTransactionsFilters);
  const isMobile = useMedia("(max-width: 767px)");
  const formikRef = useRef();

  const placeholderDate = intl.formatMessage({ id: "placeholderDate" });
  const placeholderComment = intl.formatMessage({ id: "placeholderTypeWord" });
  const translatedMsg = intl.formatMessage({ id: "notifyOneFilter" });

  const expenseCategoryNamesWithAll = [
    { label: <FormattedMessage id="expenseCategories0" />, value: 0 },
    ...expenseCategoryNames,
  ];

  const initialValues =
    transactionsFilters === null
      ? {
          type: "all",
          categories: [],
          minAmount: "",
          maxAmount: "",
          minDate: "",
          maxDate: "",
          comment: "",
        }
      : transactionsFilters;

  const handleSearchTransactions = (values) => {
    if (values === initialValues) {
      return Notify.info(translatedMsg);
    } else
      try {
        Loading.hourglass();
        dispatch(setTransactionsFilters(values));
        Loading.remove(600);
        onModalClose();
      } catch (error) {
        dispatch(setTransactionsFilters(null));
        onModalClose();
        Loading.remove();
        console.error(error);
      }
  };

  const handleSearchFormClear = () => {
    formikRef.current.resetForm();
    dispatch(setTransactionsFilters(null));
    dispatch(setFilteredTransactions(null));
    const clearButton = document.querySelector(".btn.btn--cancel");
    !isMobile && clearButton.blur();
  };

  return (
    <div className="search-form">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={transactionsFiltersValidationSchema}
        onSubmit={handleSearchTransactions}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="search-form__wrapper">
            <div className="search-form__radio-group">
              <label>
                <Field type="radio" name="type" value="all" />
                <span className="type__span">
                  {" "}
                  <FormattedMessage id="labelAll" />
                </span>
              </label>
              <label>
                <Field type="radio" name="type" value="income" />
                <span className="type__span type__span--income">
                  {" "}
                  <FormattedMessage id="labelIncomes" />
                </span>
              </label>
              <label>
                <Field type="radio" name="type" value="expense" />
                <span className="type__span type__span--expense">
                  {" "}
                  <FormattedMessage id="labelExpenses" />
                </span>
              </label>
            </div>
            {values.type === "all" || values.type === "expense" ? (
              <div className="search-form__react-select react-select">
                <div className="search-form__div">
                  <DropdownSelect
                    name="categories"
                    value={values.categories}
                    options={expenseCategoryNamesWithAll}
                    styles="transaction-form"
                    isMulti={true}
                    isSearchable={!isMobile}
                    isClearable={false}
                    placeholder={<FormattedMessage id="labelSelectCategory" />}
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
                    <div className="search-form__alert search-form__alert--category">
                      {errors.categories}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="minAmount">
                <FormattedMessage id="headerAmount" /> min:
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
                name="minAmount"
                component="div"
                className="search-form__alert search-form__alert--amount"
              />
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="maxAmount">
                <FormattedMessage id="headerAmount" /> max:
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
                name="maxAmount"
                component="div"
                className="search-form__alert search-form__alert--amount"
              />
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="minDate">
                <FormattedMessage id="labelDateFrom" />:
              </label>
              <div className="search-form__date">
                <Calendar
                  id="minDate"
                  placeholder={placeholderDate}
                  transactionType={values.type}
                  transactionDate={values.minDate}
                  isMobile={isMobile}
                  onDateChange={(newDate) => {
                    setFieldValue("minDate", newDate);
                  }}
                />
                {touched.minDate && errors.minDate && (
                  <div className="search-form__alert search-form__alert--date">
                    {errors.minDate}
                  </div>
                )}
              </div>
            </div>
            <div className="search-form__inputs">
              <label className="search-form__label" htmlFor="maxDate">
                <FormattedMessage id="labelDateTo" />:
              </label>
              <div className="search-form__date">
                <Calendar
                  id="maxDate"
                  placeholder={placeholderDate}
                  transactionType={values.type}
                  transactionDate={values.maxDate}
                  isMobile={isMobile}
                  onDateChange={(newDate) => {
                    setFieldValue("maxDate", newDate);
                  }}
                />
                {touched.maxDate && errors.maxDate && (
                  <div className="search-form__alert search-form__alert--date">
                    {errors.maxDate}
                  </div>
                )}
              </div>
            </div>
            <div className="search-form__inputs search-form__inputs--last">
              <label className="search-form__label" htmlFor="maxDate">
                <FormattedMessage id="headerComment" />:
              </label>
              <Field
                className="search-form__comment"
                type="text"
                name="comment"
                placeholder={placeholderComment}
                maxLength="34"
                autoComplete="off"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="search-form__alert search-form__alert--comment"
              />
            </div>
            <Button
              ariaLabel="submit searching transactions"
              title={<FormattedMessage id="titleSearch" />}
              styles="--submit"
              type="submit"
            />
            <Button
              ariaLabel="clear transactions filters"
              title={<FormattedMessage id="titleClear" />}
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
  onModalClose: PropTypes.func.isRequired,
};
