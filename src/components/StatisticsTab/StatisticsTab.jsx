import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectTransactions } from "../../redux/finance/selectors";
import { StatisticsDoughnut } from "./StatisticsDoughnut/StatisticsDoughnut";
import { DropdownSelect } from "../DropdownSelect/DropdownSelect";
import { assignColorsToTransactions } from "../../utils/assignColorsToTransactions";

export const StatisticsTab = () => {
  const allTransactions = useSelector(selectTransactions);
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [transactionColors, setTransactionColors] = useState({});
  const [coloredTransactions, setColoredTransactions] = useState([]);
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const [difference, setDifference] = useState(0);

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const onlyExpenseTransactions = allTransactions.filter(
      (transaction) => transaction.type !== "income"
    );

    const expenseTransactionsOfYear =
      selectedYear !== "Year"
        ? onlyExpenseTransactions.filter(
            (transaction) => transaction.date.slice(6, 10) === selectedYear
          )
        : allTransactions.filter(
            (transaction) => transaction.type !== "income"
          );

    let month;

    if (selectedMonth) {
      switch (selectedMonth) {
        case "January":
          month = "01";
          break;
        case "February":
          month = "02";
          break;
        case "March":
          month = "03";
          break;
        case "April":
          month = "04";
          break;
        case "May":
          month = "05";
          break;
        case "June":
          month = "06";
          break;
        case "July":
          month = "07";
          break;
        case "August":
          month = "08";
          break;
        case "September":
          month = "09";
          break;
        case "October":
          month = "10";
          break;
        case "November":
          month = "11";
          break;
        case "December":
          month = "12";
          break;
        default:
          break;
      }
    }

    const expenseTransactionsOfMonth =
      selectedMonth !== "Month"
        ? expenseTransactionsOfYear.filter(
            (transaction) => transaction.date.slice(3, 5) === month
          )
        : allTransactions.filter(
            (transaction) => transaction.type !== "income"
          );
    const incomeTransactions = allTransactions.filter(
      (transaction) => transaction.type === "income"
    );

    const incomeTransactionsOfYear =
      selectedYear !== "Year"
        ? incomeTransactions.filter(
            (transaction) => transaction.date.slice(6, 10) === selectedYear
          )
        : allTransactions.filter(
            (transaction) => transaction.type === "income"
          );

    const incomeTransactionsOfMonth =
      selectedMonth !== "Month"
        ? incomeTransactionsOfYear.filter(
            (transaction) => transaction.date.slice(3, 5) === month
          )
        : allTransactions.filter(
            (transaction) => transaction.type === "income"
          );

    setExpenseSum(
      expenseTransactionsOfMonth.reduce((sum, transaction) => {
        if (transaction.type === "expense") {
          sum += transaction.amount;
        }
        return sum;
      }, 0)
    );

    setIncomeSum(
      incomeTransactionsOfMonth.reduce((sum, transaction) => {
        if (transaction.type === "income") {
          sum += transaction.amount;
        }
        return sum;
      }, 0)
    );

    setDifference(incomeSum - expenseSum);

    const colors = assignColorsToTransactions(expenseTransactionsOfMonth);
    setTransactionColors(colors);

    const expenseTransactionsAll = expenseTransactionsOfMonth.map(
      (transaction) => ({
        ...transaction,
        color: colors[transaction.category] || "#000000",
      })
    );

    const categorySum = {};
    expenseTransactionsAll.forEach((transaction) => {
      const { category, amount } = transaction;

      if (categorySum[category]) {
        categorySum[category].amount += amount;
      } else {
        categorySum[category] = { ...transaction };
      }
    });
    const summedExpenseTransactions = Object.values(categorySum);
    setColoredTransactions(summedExpenseTransactions);
  }, [allTransactions, selectedYear, selectedMonth, expenseSum, incomeSum]);

  useEffect(() => {}, [coloredTransactions]);

  const expensesCategories = coloredTransactions.reduce(
    (categories, transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) +
        parseFloat(transaction.amount);
      return categories;
    },
    {}
  );

  const expensesLabels = Object.keys(expensesCategories);
  const expensesData = Object.values(expensesCategories);

  return (
    <div className="statistics__container">
      <div className="statistics__wrapper">
        <h2 className="statistics__title">Statistics</h2>
        <StatisticsDoughnut />
      </div>
      <div className="statistics__dropdown">
        <div className="statistics__dropdown-wrapper">
          <DropdownSelect
            name="year"
            isSearchable={false}
            onChange={handleSelectYear}
          />
          <DropdownSelect
            name="month"
            isSearchable={false}
            onChange={handleSelectMonth}
          />
        </div>
        <div className="statistics__legend">
          <ul className="statistics__legend-headers">
            <li className="statistics__legend-header">Category</li>
            <li className="statistics__legend-header">Sum</li>
          </ul>
          <ul className="statistics__legend-list">
            {coloredTransactions?.length > 0 ? (
              coloredTransactions.map(({ _id, category, amount, color }) => (
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
                  No expense allTransactions found
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
