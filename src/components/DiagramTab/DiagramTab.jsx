import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectUser } from "../../redux/session/selectors";
import { selectTransactions } from "../../redux/finance/selectors";
import { fetchTransactions } from "../../redux/finance/operations";
import { Doughnut } from "react-chartjs-2";
import { DropdownSelectYear } from "../DropdownSelect/DropdownSelect";
import { DropdownSelectMonth } from "../DropdownSelect/DropdownSelect";
import { assignColorsToTransactions } from "../../utils/assignColorsToTransactions";
import "chart.js/auto";

export const DiagramTab = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const transactions = useSelector(selectTransactions);
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [transactionColors, setTransactionColors] = useState({});
  const [coloredTransactions, setColoredTransactions] = useState([]);
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const [difference, setDifference] = useState(0);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    dispatch(fetchTransactions(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type !== "income"
    );

    const expenseTransactionsOfYear =
      selectedYear !== "Year"
        ? expenseTransactions.filter(
            (transaction) => transaction.date.slice(6, 10) === selectedYear
          )
        : transactions.filter((transaction) => transaction.type !== "income");

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
        : transactions.filter((transaction) => transaction.type !== "income");
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income"
    );

    const incomeTransactionsOfYear =
      selectedYear !== "Year"
        ? incomeTransactions.filter(
            (transaction) => transaction.date.slice(6, 10) === selectedYear
          )
        : transactions.filter((transaction) => transaction.type === "income");

    const incomeTransactionsOfMonth =
      selectedMonth !== "Month"
        ? incomeTransactionsOfYear.filter(
            (transaction) => transaction.date.slice(3, 5) === month
          )
        : transactions.filter((transaction) => transaction.type === "income");

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
  }, [transactions, selectedYear, selectedMonth, expenseSum, incomeSum]);

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

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div className="diagram">
      <div className="diagram__doughnut">
        <h2 className="diagram__doughnut-title">Statistics</h2>
        <div className="diagram__doughnut-wrapper">
          <span className="diagram__doughnut-balance">
            {difference.toFixed(2)} PLN
          </span>
          <Doughnut
            data={{
              labels: expensesLabels.length > 0 ? expensesLabels : ["Income"],
              datasets: [
                {
                  data: expensesData.length > 0 ? expensesData : [incomeSum],
                  backgroundColor: expensesLabels.map(
                    (category) => transactionColors[category]
                  ),
                },
              ],
            }}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="diagram__dropdown">
        <div className="diagram__dropdown-wrapper">
          <label className="diagram__dropdown-label diagram__dropdown-label--month">
            <DropdownSelectMonth
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onSelect={handleMonthSelect}
            />
          </label>
          <label className="diagram__dropdown-label diagram__dropdown-label--year">
            <DropdownSelectYear
              selectedYear={selectedYear}
              onSelect={handleYearSelect}
            />
          </label>
        </div>

        <div className="diagram__legend">
          <ul className="diagram__legend-headers">
            <li className="diagram__legend-header">Category</li>
            <li className="diagram__legend-header">Sum</li>
          </ul>
          <ul className="diagram__legend-list">
            {coloredTransactions?.length > 0 ? (
              coloredTransactions.map(({ _id, category, amount, color }) => (
                <li key={_id} className="diagram__legend-item">
                  <div
                    className="diagram__legend-icon"
                    style={{
                      backgroundColor: `${color}`,
                    }}
                  ></div>
                  <p className="diagram__legend-category">{category}</p>
                  <p className="diagram__legend-amount">
                    {amount.toFixed(2)} PLN
                  </p>
                </li>
              ))
            ) : (
              <li className="diagram__legend-item">
                <p className="diagram__legend-category">
                  No expense transactions found
                </p>
              </li>
            )}
          </ul>
        </div>

        <div className="diagram__summary">
          <ul className="diagram__summary-list">
            <li className="diagram__summary-item">
              <p className="diagram__summary-type">Expenses:</p>
              <p className="diagram__summary-type diagram__summary-type--expense">
                {expenseSum.toFixed(2)} PLN
              </p>
            </li>
            <li className="diagram__summary-item">
              <p className="diagram__summary-type">Income:</p>
              <p className="diagram__summary-type diagram__summary-type--income">
                {incomeSum.toFixed(2)} PLN
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
