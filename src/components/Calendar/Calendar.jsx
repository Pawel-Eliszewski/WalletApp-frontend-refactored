import PropTypes from "prop-types";
import { useMedia } from "react-use";
import DatePicker from "react-datepicker";
import {
  formattedTransactionDate,
  handleNewDate,
} from "../../utils/dateHandlers";
import { useEffect } from "react";
/**
 * @param {{ transactionType: 'income' | 'expense',
 * transactionDate: string, onDateChange: () => void }} props
 */
export const Calendar = ({
  transactionType,
  transactionDate,
  onDateChange,
}) => {
  const isMobile = useMedia("(max-width: 767px)");

  const disableScreenKeyboard = () => {
    const input = document.querySelector(
      ".react-datepicker__input-container input"
    );
    input.readOnly = true;
  };

  useEffect(() => {
    isMobile && disableScreenKeyboard();
  }, [isMobile]);

  return (
    <DatePicker
      selected={formattedTransactionDate(transactionDate)}
      onChange={(newDate) => onDateChange(handleNewDate(newDate))}
      dateFormat="dd.MM.yyyy"
      calendarClassName={
        "react-datepicker" + (transactionType === "income" ? "--income" : "")
      }
    />
  );
};

Calendar.propTypes = {
  transactionType: PropTypes.string.isRequired,
  transactionDate: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
};
