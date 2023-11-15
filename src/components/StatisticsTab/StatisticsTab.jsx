import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectTransactions,
  selectTransactionsYears,
  selectTransactionsSummary,
} from "../../redux/finance/selectors";
import { StatisticsDoughnut } from "./StatisticsDoughnut/StatisticsDoughnut";
import { DropdownSelect } from "../DropdownSelect/DropdownSelect";
import { getMonthsForYear } from "../../utils/getMonthsForYear";

export const StatisticsTab = () => {
  const allTransactions = useSelector(selectTransactions);
  const allTransactionsSummary = useSelector(selectTransactionsSummary);
  const allTransactionsYears = useSelector(selectTransactionsYears);

  const [expenseSum, setExpenseSum] = useState(allTransactionsSummary.expense);
  const [incomeSum, setIncomeSum] = useState(allTransactionsSummary.income);
  const [balance, setBalance] = useState(
    allTransactionsSummary.income - allTransactionsSummary.expense
  );
  const [selectedYear, setSelectedYear] = useState({
    label: "Select year",
    value: "",
  });
  const [selectedMonth, setSelectedMonth] = useState({
    label: "Select month",
    value: "",
  });
  const [transactionsWithColors, setTransactionsWithColors] = useState([]);

  const monthsForSelectedYear = getMonthsForYear(
    allTransactions,
    selectedYear.value
  );

  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
  };

  // const expensesLabels = Object.keys(expensesCategories);
  // const expensesData = Object.values(expensesCategories);

  return (
    <div className="statistics__container">
      <div className="statistics__doughnut-wrapper">
        <h2 className="statistics__title">Statistics</h2>
        <StatisticsDoughnut balance={balance} />
      </div>
      <div className="statistics__content">
        <div className="statistics__dropdown-wrapper">
          <DropdownSelect
            name="year"
            isSearchable={false}
            options={allTransactionsYears}
            value={selectedYear}
            onChange={handleSelectYear}
          />
          <DropdownSelect
            name="month"
            isDisabled={selectedYear.value === "" ? true : false}
            isSearchable={false}
            options={monthsForSelectedYear}
            value={selectedMonth}
            onChange={handleSelectMonth}
          />
        </div>
        <div className="statistics__legend">
          <ul className="statistics__legend-headers">
            <li className="statistics__legend-header">Category</li>
            <li className="statistics__legend-header">Sum</li>
          </ul>
          <ul className="statistics__legend-list">
            {transactionsWithColors?.length > 0 ? (
              transactionsWithColors.map(({ _id, category, amount, color }) => (
                <li key={_id} className="statistics__legend-item">
                  <div
                    className="statistics__legend-icon"
                    style={{
                      backgroundColor: `${color}`,
                    }}
                  ></div>
                  <p className="statistics__legend-category">{category}</p>
                  <p className="statistics__legend-amount">
                    {amount.toFixed(2)} PLN
                  </p>
                </li>
              ))
            ) : (
              <li className="statistics__legend-item">
                <p className="statistics__legend-category">
                  No expense transactions for selected date
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className="statistics__summary">
          <ul className="statistics__summary-list">
            <li className="statistics__summary-item">
              <p className="statistics__summary-type">Expenses:</p>
              <p className="statistics__summary-type statistics__summary-type--expense">
                {expenseSum.toFixed(2)} PLN
              </p>
            </li>
            <li className="statistics__summary-item">
              <p className="statistics__summary-type">Income:</p>
              <p className="statistics__summary-type statistics__summary-type--income">
                {incomeSum.toFixed(2)} PLN
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
