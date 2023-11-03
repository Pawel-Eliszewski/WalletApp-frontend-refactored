export const paginateTransactions = (transactions, page) => {
  if (!transactions || transactions.length === 0) {
    return {
      pages: 0,
      paginatedTransactions: [],
    };
  }

  const length = transactions.length;
  const pages = Math.ceil(length / 5);

  let currentPage;
  if (!page) {
    currentPage = 1;
  } else if (page > pages) {
    currentPage = pages;
  } else {
    currentPage = page;
  }

  let start = (currentPage - 1) * 5;
  let end = currentPage * 5;

  const sortedTransactions = [...transactions];

  sortedTransactions.sort((a, b) => {
    const dateA = new Date(a.date.split(".").reverse().join("-"));
    const dateB = new Date(b.date.split(".").reverse().join("-"));

    return dateB - dateA;
  });

  const paginatedTransactions = sortedTransactions.slice(start, end);

  const paginationData = {
    pages,
    paginatedTransactions,
  };
  return paginationData;
};
