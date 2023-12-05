import PropTypes from "prop-types";
import { useIntl, FormattedMessage } from "react-intl";
import { useRef } from "react";
import { useMedia } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTransactions,
  selectTransactionsFilters,
  selectFilteredTransactions,
} from "../../../redux/finance/selectors";
import {
  setTransactionsFilters,
  setFilteredTransactions,
} from "../../../redux/finance/financeSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import { DropdownSelect } from "../../DropdownSelect/DropdownSelect";
import { Calendar } from "../../Calendar/Calendar";
import { getTransactionsCategories } from "../../../utils/transactionsDataOperations";
import { expenseCategoryOptions } from "../../../utils/transactionCategories";
import { transactionsFiltersValidationSchema } from "../../../utils/yupValidationSchemas";
import { Loading, Notify } from "notiflix";
/**
 * @param {{ onModalClose: () => void }} props
 */
export const SearchForm = ({ onModalClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const allTransactions = useSelector(selectTransactions);
  const transactionsFilters = useSelector(selectTransactionsFilters);
  const filteredTransactions = useSelector(selectFilteredTransactions);
  const isMobile = useMedia("(max-width: 767px)");
  const formikRef = useRef();

  const placeholderDate = intl.formatMessage({ id: "placeholderDate" });
  const placeholderComment = intl.formatMessage({ id: "placeholderTypeWord" });
  const translatedMsg = intl.formatMessage({ id: "notifyOneFilter" });

  const usedExpenseCategories = getTransactionsCategories(allTransactions);

  const expenseCategoryOptionsWithAll = [
    { label: <FormattedMessage id="expenseCategoriesAll" />, value: "all" },
    ...expenseCategoryOptions.filter((option) =>
      usedExpenseCategories.includes(option.value)
    ),
  ];

  const initialValues = {
    type: transactionsFilters ? transactionsFilters.type : "all",
    categories:
      !transactionsFilters || transactionsFilters.categories.includes("all")
        ? [expenseCategoryOptionsWithAll[0]]
        : expenseCategoryOptions.filter((option) =>
            transactionsFilters.categories.includes(option.value)
          ),
    minAmount: transactionsFilters ? transactionsFilters.minAmount : "",
    maxAmount: transactionsFilters ? transactionsFilters.maxAmount : "",
    minDate: transactionsFilters ? transactionsFilters.minDate : "",
    maxDate: transactionsFilters ? transactionsFilters.maxDate : "",
    comment: transactionsFilters ? transactionsFilters.comment : "",
  };

  const handleCategoriesChange = (selectedOptions) => {
    const hasAllCategories = selectedOptions.some(
      (option) => option.value === "all"
    );
    const isFirstElementAll =
      selectedOptions.length > 0 && selectedOptions[0].value === "all";
    if (isFirstElementAll) {
      const updatedOptions = selectedOptions.slice(1);
      formikRef.current.setFieldValue("categories", updatedOptions);
    } else if (hasAllCategories) {
      formikRef.current.setFieldValue("categories", [
        selectedOptions.find((option) => option.value === "all"),
      ]);
    } else if (selectedOptions.length === 0) {
      const allOption = {
        label: <FormattedMessage id="expenseCategoriesAll" />,
        value: "all",
      };
      formikRef.current.setFieldValue("categories", [allOption]);
    } else {
      formikRef.current.setFieldValue("categories", selectedOptions);
    }
  };

  const handleSearchTransactions = (values) => {
    const formData = {
      type: values.type,
      categories: values.categories.map((option) => option.value),
      minAmount: values.minAmount,
      maxAmount: values.maxAmount,
      minDate: values.minDate,
      maxDate: values.maxDate,
      comment: values.comment,
    };
    if (values === initialValues) {
      return Notify.info(translatedMsg);
    } else
      try {
        dispatch(setTransactionsFilters(formData));
        if (transactionsFilters && filteredTransactions.length === 0) {
          return Notify.info("brak");
        } else {
          Loading.hourglass();
          Loading.remove(600);
          onModalClose();
        }
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
        {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
          <Form className="search-form__wrapper">
            <div className="search-form__radio-group">
              <label>
                <Field
                  className="search-form__radio"
                  type="radio"
                  name="type"
                  value="all"
                />
                <span className="search-form__radio type__span">
                  {" "}
                  <FormattedMessage id="labelAll" />
                </span>
              </label>
              <label>
                <Field
                  className="search-form__radio"
                  type="radio"
                  name="type"
                  value="income"
                />
                <span className="search-form__radio type__span type__span--income">
                  {" "}
                  <FormattedMessage id="labelIncomes" />
                </span>
              </label>
              <label>
                <Field
                  className="search-form__radio"
                  type="radio"
                  name="type"
                  value="expense"
                />
                <span className="search-form__radio type__span type__span--expense">
                  {" "}
                  <FormattedMessage id="labelExpenses" />
                </span>
              </label>
            </div>
            {values.type === "expense" ? (
              <div className="search-form__react-select react-select">
                <div className="search-form__div">
                  <DropdownSelect
                    name="categories"
                    value={values.categories}
                    options={expenseCategoryOptionsWithAll}
                    styles="search-form"
                    isMulti={true}
                    isSearchable={!isMobile}
                    isClearable={false}
                    placeholder={<FormattedMessage id="labelSelectCategory" />}
                    onChange={handleCategoriesChange}
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
                    .replace(/^0{2,}/, "0")
                    .replace(/^0[^.,]/, "0")
                    .replace(/^[.,]/, "")
                    .replace(/,/g, ".")
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/(\.\d{1,2}).*/g, "$1");
                  setFieldValue("minAmount", e.target.value);
                }}
                className="search-form__amount"
                placeholder="0.00"
                autoComplete="off"
              />
              <ErrorMessage
                name="minAmount"
                component="span"
                className="search-form__alert"
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
                    .replace(/^0{2,}/, "0")
                    .replace(/^0[^.,]/, "0")
                    .replace(/^[.,]/, "")
                    .replace(/,/g, ".")
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1")
                    .replace(/(\.\d{1,2}).*/g, "$1");
                  setFieldValue("maxAmount", e.target.value);
                }}
                className="search-form__amount"
                placeholder="0.00"
                autoComplete="off"
              />
              <ErrorMessage
                name="maxAmount"
                component="span"
                className="search-form__alert"
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
                    setFieldTouched("minDate", true);
                  }}
                  onBlur={() => setFieldTouched("minDate", true)}
                />
                {touched.minDate && errors.minDate && (
                  <span className="search-form__alert">{errors.minDate}</span>
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
                    setFieldTouched("maxDate", true);
                  }}
                  onBlur={() => setFieldTouched("maxDate", true)}
                />
                {touched.maxDate && errors.maxDate && (
                  <span className="search-form__alert search-form__alert--date">
                    {errors.maxDate}
                  </span>
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
