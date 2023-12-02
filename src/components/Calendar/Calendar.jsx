import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Button } from "../Button/Button";
import {
  formattedTodayDate,
  formattedTransactionDate,
  handleNewDate,
} from "../../utils/dateHandlers";
/**
 * @param {{ id: string, placeholder?: string, transactionType: 'income' | 'expense',
 * transactionDate: string, isMobile: boll, onDateChange: () => void }} props
 */
export const Calendar = ({
  id,
  placeholder,
  transactionType,
  transactionDate,
  isMobile,
  onDateChange,
}) => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    const disableScreenKeyboard = () => {
      if (id && isMobile) {
        const input = document.querySelector(
          `.react-datepicker__input-container input#${id}`
        );
        input.readOnly = true;
      }
    };
    disableScreenKeyboard();
  }, [id, isMobile]);

  const handleDateToday = () => {
    onDateChange(formattedTodayDate);
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const handleDateClear = () => {
    onDateChange("");
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  return (
    <DatePicker
      ref={datePickerRef}
      id={id}
      placeholderText={placeholder}
      calendarStartDay={1}
      selected={formattedTransactionDate(transactionDate)}
      onChange={(newDate) => onDateChange(handleNewDate(newDate))}
      dateFormat="dd.MM.yyyy"
      calendarClassName={transactionType === "income" ? "--income" : ""}
      autoComplete="off"
    >
      <Button
        ariaLabel="set today`s date"
        title={<FormattedMessage id="titleToday" />}
        styles="--today"
        type="button"
        onClick={handleDateToday}
      />
      <Button
        ariaLabel="clear date"
        title={<FormattedMessage id="titleClear" />}
        styles="--today"
        type="button"
        onClick={handleDateClear}
      />
    </DatePicker>
  );
};

Calendar.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  transactionType: PropTypes.string.isRequired,
  transactionDate: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  onDateChange: PropTypes.func.isRequired,
};
