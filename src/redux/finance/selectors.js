export const selectTransactions = (state) => state.finance.data;

export const selectTransactionId = (state) => state.finance.transactionId;

export const selectTransactionsYears = (state) => {
  const transactions = selectTransactions(state);

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

export const selectTransactionsCategories = (state) => {
  const transactions = selectTransactions(state);

  const categoriesSet = new Set();

  transactions.forEach((transaction) => {
    categoriesSet.add(transaction.category);
  });

  const uniqueCategories = Array.from(categoriesSet);

  return uniqueCategories;
};

export const selectTransactionsSummary = (state) => {
  const transactions = selectTransactions(state);

  let transactionsSummary = {
    expense: 0,
    income: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      transactionsSummary.income += transaction.amount;
    } else {
      transactionsSummary.expense += transaction.amount;
    }
  });

  return transactionsSummary;
};

export const selectBalance = (state) => state.finance.totalBalance;
