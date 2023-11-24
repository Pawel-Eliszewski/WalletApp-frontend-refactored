export const selectTransactions = (state) => state.finance.transactions;

export const selectTransactionsFilters = (state) =>
  state.finance.transactionsFilters;

export const selectFilteredTransactions = (state) =>
  state.finance.filteredTransactions;

export const selectTransactionId = (state) => state.finance.transactionId;

export const selectBalance = (state) => state.finance.totalBalance;
