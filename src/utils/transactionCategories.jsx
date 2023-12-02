import { FormattedMessage } from "react-intl";

export const expenseCategories = [
  {
    id: 0,
    category: <FormattedMessage id="expenseCategories0" />,
    color: "#24cca7",
  },
  {
    id: 1,
    category: <FormattedMessage id="expenseCategories1" />,
    color: "#fed057",
  },
  {
    id: 2,
    category: <FormattedMessage id="expenseCategories2" />,
    color: "#ffd8d0",
  },
  {
    id: 3,
    category: <FormattedMessage id="expenseCategories3" />,
    color: "#ffd8d0",
  },
  {
    id: 4,
    category: <FormattedMessage id="expenseCategories4" />,
    color: "#ffd8d0",
  },
  {
    id: 5,
    category: <FormattedMessage id="expenseCategories5" />,
    color: "#6e78e8",
  },
  {
    id: 6,
    category: <FormattedMessage id="expenseCategories6" />,
    color: "#4a56e2",
  },
  {
    id: 7,
    category: <FormattedMessage id="expenseCategories7" />,
    color: "#81e1ff",
  },
  {
    id: 8,
    category: <FormattedMessage id="expenseCategories8" />,
    color: "#24cca7",
  },
  {
    id: 9,
    category: <FormattedMessage id="expenseCategories9" />,
    color: "#00ad84",
  },
  {
    id: 10,
    category: <FormattedMessage id="expenseCategories10" />,
    color: "#ff6596",
  },
];

export const expenseCategoryOptions = expenseCategories
  .filter((option) => option.id !== 0)
  .map((option) => ({
    label: option.category,
    value: option.id,
  }));
