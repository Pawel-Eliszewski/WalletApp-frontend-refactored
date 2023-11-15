export const getMonthsForYear = (transactions, year) => {
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
      value: formatMonth(month),
    }));

  return formattedMonths;
};

const formatMonth = (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[parseInt(month, 10) - 1] || "";
};
