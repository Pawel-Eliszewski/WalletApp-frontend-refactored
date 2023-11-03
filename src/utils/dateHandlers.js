const today = new Date();
const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
export const formattedTodayDate = today.toLocaleDateString(
  "pl-PL",
  dateOptions
);

export const formattedTransactionDate = (transactionDate) => {
  const dateParts = transactionDate.split(".");
  const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  return date;
};

export const handleNewDate = (newDate) => {
  if (newDate !== null) {
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const dateString =
      (day < 10 ? "0" : "") +
      day +
      "." +
      (month < 10 ? "0" : "") +
      month +
      "." +
      year;

    return dateString;
  }
};
