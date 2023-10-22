import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "./Calendar.css";
/**
 * @param {{ transactionType: 'income' | 'expense',
 * transactionDate: string, onChange: () => void }} props
 */
export const Calendar = ({ transactionType, transactionDate, onChange }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [transactionDate]);

  const calendarIncomeClass = transactionType === "income" ? " income" : "";

  return (
    <div className="calendarBox">
      <Datetime
        key={key}
        className={"calendar" + calendarIncomeClass}
        initialValue={transactionDate}
        onChange={(newDate) => onChange(newDate)}
        dateFormat="DD.MM.YYYY"
        timeFormat={false}
        closeOnSelect="true"
        inputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

Calendar.propTypes = {
  transactionType: PropTypes.string,
  transactionDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
