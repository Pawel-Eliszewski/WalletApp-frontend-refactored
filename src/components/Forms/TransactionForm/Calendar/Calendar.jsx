import PropTypes from "prop-types";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Button } from "../../../Button/Button";
import {
  formattedTransactionDate,
  handleNewDate,
} from "../../../../utils/dateHandlers";
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

  return (
    <DatePicker
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
        ariaLabel="set date for today"
        title="Today"
        styles="--today"
        type="button"
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
