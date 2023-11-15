const expenseCategories = [
  { category: "Main expenses", color: "#fed057" },
  { category: "Products", color: "#ffd8d0" },
  { category: "Car", color: "#ffd8d0" },
  { category: "Self care", color: "#ffd8d0" },
  { category: "Child care", color: "#6e78e8" },
  { category: "Household products", color: "#4a56e2" },
  { category: "Education", color: "#81e1ff" },
  { category: "Leisure", color: "#24cca7" },
  { category: "Other expenses", color: "#00ad84" },
  { category: "Entertainment", color: "#ff6596" },
];

export const expenseCategoryNames = expenseCategories.map((option) => ({
  label: option.category,
  value: option.category,
}));
