const expenseCategories = [
  "Main expenses",
  "Products",
  "Car",
  "Self care",
  "Child care",
  "Household products",
  "Education",
  "Leisure",
  "Other expenses",
  "Entertainment",
];

export const categoryOptions = expenseCategories.map((option) => ({
  label: option,
  value: option,
}));
