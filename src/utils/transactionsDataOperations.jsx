import { FormattedMessage } from "react-intl";
import { formattedTransactionDate } from "./dateHandlers";

export const countTransactionsSummary = (transactions) => {
  let transactionsSummary = {
    expense: 0,
    income: 0,
    balance: 0,
  };

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      transactionsSummary.income += amount;
    } else {
      transactionsSummary.expense += amount;
    }
  });

  transactionsSummary.balance =
    transactionsSummary.income - transactionsSummary.expense;

  return transactionsSummary;
};

export const getTransactionsYears = (transactions) => {
  const yearsSet = new Set();

  transactions.forEach((transaction) => {
    const year = transaction.date.slice(6, 10);
    yearsSet.add(year);
  });

  const sortedYears = Array.from(yearsSet).sort();

  return sortedYears.map((option) => ({
    label: option,
    value: option,
  }));
};

export const sumExpensesWithColors = (transactions, expenseCategories) => {
  const summedExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;

      const existingCategory = acc.find((item) => item.category === category);

      if (existingCategory) {
        existingCategory.amount += amount;
      } else {
        acc.push({ category, amount });
      }

      return acc;
    }, []);

  const summedExpensesWithColors = summedExpenses.map((summedExpense) => {
    const { category, amount } = summedExpense;
    const matchingCategory = expenseCategories.find(
      (expenseCategory) => expenseCategory.id === category
    );

    return {
      category,
      amount,
      color: matchingCategory?.color || "#000000",
    };
  });

  const sortedExpensesWithColors = summedExpensesWithColors.sort(
    (a, b) => b.amount - a.amount
  );

  return sortedExpensesWithColors;
};

export const getMonthsForSelectedYear = (transactions, year) => {
  const monthsSet = new Set();

  transactions.forEach((transaction) => {
    const yearOfTransaction = transaction.date.slice(6, 10);

    if (yearOfTransaction === year) {
      const month = transaction.date.slice(3, 5);
      monthsSet.add(month);
    }
  });

  const formattedMonths = Array.from(monthsSet)
    .sort()
    .map((month) => ({
      label: formatMonth(month),
      value: month,
    }));

  return formattedMonths;
};

const formatMonth = (month) => {
  const monthNames = [
    "monthsJanuary",
    "monthsFebruary",
    "monthsMarch",
    "monthsApril",
    "monthsMay",
    "monthsJune",
    "monthsJuly",
    "monthsAugust",
    "monthsSeptember",
    "monthsOctober",
    "monthsNovember",
    "monthsDecember",
  ];

  return <FormattedMessage id={monthNames[parseInt(month, 10) - 1]} />;
};

export const filterTransactions = (transactions, year, month) => {
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionYear = transaction.date.split(".")[2];
    const transactionMonth = transaction.date.split(".")[1];

    const yearCondition = year ? transactionYear === year : true;
    const monthCondition = month ? transactionMonth === month : true;

    return yearCondition && monthCondition;
  });

  return filteredTransactions;
};

export const filterQueryTransactions = (transactions, values) => {
  let filteredTransactions = [...transactions];

  const formData = {
    minDate:
      values.minDate !== "" ? formattedTransactionDate(values.minDate) : "",
    maxDate:
      values.maxDate !== "" ? formattedTransactionDate(values.maxDate) : "",
  };

  if (values.type !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === values.type
    );
  }

  if (
    values.categories &&
    values.categories.length > 0 &&
    values.categories[0].value !== "all"
  ) {
    const selectedCategories = values.categories.map(
      (category) => category.value
    );
    filteredTransactions = filteredTransactions.filter((transaction) =>
      selectedCategories.includes(transaction.category)
    );
  }

  if (values.minAmount !== "") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.amount >= values.minAmount
    );
  }

  if (values.maxAmount !== "") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.amount <= values.maxAmount
    );
  }

  if (formData.minDate !== "") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) =>
        formattedTransactionDate(transaction.date) >= formData.minDate
    );
  }

  if (formData.maxDate !== "") {
    const maxDatePlusOne = new Date(formData.maxDate);
    maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);

    filteredTransactions = filteredTransactions.filter(
      (transaction) =>
        formattedTransactionDate(transaction.date) < maxDatePlusOne
    );
  }

  if (values.comment !== "") {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.comment.toLowerCase().includes(values.comment.toLowerCase())
    );
  }
  return filteredTransactions;
};
