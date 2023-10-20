import { selectTransactions } from "../redux/finance/selectors";
import { useSelector } from "react-redux";

export const paginateTransactions = (page) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const transactions = useSelector(selectTransactions);

  if (!transactions || transactions.length === 0) {
    return {
      pages: 0,
      paginatedTransactions: [],
    };
  }

  const length = transactions.length;
  const pages = Math.ceil(length / 7);

  let currentPage;
  if (!page) {
    currentPage = 1;
  } else if (page > pages) {
    currentPage = pages;
  } else {
    currentPage = page;
  }

  let start = (currentPage - 1) * 7;
  let end = currentPage * 7;

  const sortedTransactions = [...transactions]; // Tworzy kopię tablicy transactions

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
