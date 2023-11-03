import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import {
  formattedTransactionDate,
  handleNewDate,
} from "../../utils/dateHandlers";
/**
 * @param {{ transactionType: 'income' | 'expense',
 * transactionDate: string, onDateChange: () => void }} props
 */
export const Calendar = ({
  transactionType,
  transactionDate,
  onDateChange,
}) => {
  const calendarIncomeClass = transactionType === "income" ? "--income" : "";

  return (
    <DatePicker
      selected={formattedTransactionDate(transactionDate)}
      onChange={(newDate) => onDateChange(handleNewDate(newDate))}
      dateFormat="dd.MM.yyyy"
      calendarClassName={"react-datepicker" + calendarIncomeClass}
    />
  );
};

Calendar.propTypes = {
  transactionType: PropTypes.string.isRequired,
  transactionDate: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
};
