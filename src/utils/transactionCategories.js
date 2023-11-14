const expenseCategoryNames = [
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

export const expenseCategories = expenseCategoryNames.map((option) => ({
  label: option,
  value: option,
}));
