import { useSelector } from "react-redux";
import { useState } from "react";
import { selectTransactions } from "../../redux/finance/selectors";
import { StatisticsDoughnut } from "./StatisticsDoughnut/StatisticsDoughnut";
import { DropdownSelect } from "../DropdownSelect/DropdownSelect";
import {
  getTransactionsYears,
  countTransactionsSummary,
  getMonthsForSelectedYear,
  sumExpensesWithColors,
  filterTransactions,
} from "../../utils/transactionsDataOperations";
import { expenseCategories } from "../../utils/transactionCategories";
import { nanoid } from "nanoid";

export const StatisticsTab = () => {
  const allTransactions = useSelector(selectTransactions);

  const [selectedRangeTransactions, setSelectedRangeTransactions] =
    useState(allTransactions);

  const [selectedYear, setSelectedYear] = useState({
    label: "Select year",
    value: "",
  });
  const [selectedMonth, setSelectedMonth] = useState({
    label: "Select month",
    value: "",
  });

  const summedExpensesWithColors = sumExpensesWithColors(
    selectedRangeTransactions,
    expenseCategories
  );

  const { income, expense, balance } = countTransactionsSummary(
    selectedRangeTransactions
  );

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setSelectedMonth({
      label: "Select month",
      value: "",
    });
    setSelectedRangeTransactions(
      filterTransactions(allTransactions, year.value)
    );
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setSelectedRangeTransactions(
      filterTransactions(allTransactions, selectedYear.value, month.value)
    );
  };

  // const expensesLabels = Object.keys(expensesCategories);
  // const expensesData = Object.values(expensesCategories);

  return (
    <div className="statistics__container">
      <div className="statistics__doughnut-wrapper">
        <h2 className="statistics__title">Statistics</h2>
        <StatisticsDoughnut balance={balance} />
        <span className="statistics__data-range">
          {"Statistics for: "}
          {selectedMonth.value === "" ? "all-year" : selectedMonth.label}{" "}
          {selectedYear.value === "" ? "all-time" : selectedYear.value}
        </span>
      </div>
      <div className="statistics__content">
        <div className="statistics__dropdown-wrapper">
          <DropdownSelect
            name="year"
            isSearchable={false}
            options={getTransactionsYears(allTransactions)}
            value={selectedYear}
            onChange={handleSelectYear}
          />
          <DropdownSelect
            name="month"
            isDisabled={selectedYear.value === "" ? true : false}
            isSearchable={false}
            options={getMonthsForSelectedYear(
              allTransactions,
              selectedYear.value
            )}
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
            {summedExpensesWithColors?.length > 0 ? (
              summedExpensesWithColors.map(({ category, amount, color }) => (
                <li key={nanoid()} className="statistics__legend-item">
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
                {expense.toFixed(2)} PLN
              </p>
            </li>
            <li className="statistics__summary-item">
              <p className="statistics__summary-type">Income:</p>
              <p className="statistics__summary-type statistics__summary-type--income">
                {income.toFixed(2)} PLN
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
