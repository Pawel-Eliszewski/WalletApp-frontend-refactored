import PropTypes from "prop-types";
import { useEffect } from "react";
import { useMedia } from "react-use";
import DatePicker from "react-datepicker";
import { Button } from "../../../Button/Button";
import {
  formattedTransactionDate,
  handleNewDate,
} from "../../../../utils/dateHandlers";
/**
 * @param {{ transactionType: 'income' | 'expense',
 * transactionDate: string, onDateChange: () => void }} props
 */
export const Calendar = ({
  id,
  placeholder,
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
      id={id}
      // popperPlacement="auto"
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
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  transactionType: PropTypes.string.isRequired,
  transactionDate: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
};
