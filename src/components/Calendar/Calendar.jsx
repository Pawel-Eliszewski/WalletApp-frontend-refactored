import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "./Calendar.scss";
/**
 * @param {{ transactionType: 'income' | 'expense',
 * transactionDate: string, onChange: () => void }} props
 */
export const Calendar = ({ transactionType, transactionDate, onChange }) => {
  const dateParts = transactionDate.split(".");
  const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

  const calendarIncomeClass = transactionType === "income" ? "--income" : "";

  return (
    <DatePicker
      selected={date}
      onChange={(date) => onChange(date)}
      dateFormat="dd.MM.yyyy"
      calendarClassName={"react-datepicker" + calendarIncomeClass}
    />
  );
};

Calendar.propTypes = {
  transactionType: PropTypes.string,
  transactionDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
