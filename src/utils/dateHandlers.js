const today = new Date();
const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
export const formattedTodayDate = today.toLocaleDateString(
  "pl-PL",
  dateOptions
);

export const formattedTransactionDate = (transactionDate) => {
  if (!transactionDate || typeof transactionDate !== "string") {
    return null;
  }
  const dateParts = transactionDate.split(".");

  if (dateParts.length !== 3) {
    return null;
  }
  const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

  if (isNaN(date.getTime())) {
    return null;
  }
  return date;
};

export const handleNewDate = (newDate) => {
  if (newDate !== null && typeof newDate !== "undefined") {
    const date = new Date(newDate);

    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

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
  }

  return null;
};
