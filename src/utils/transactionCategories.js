export const expenseCategories = [
  { id: 1, category: "Main expenses", color: "#fed057" },
  { id: 2, category: "Products", color: "#ffd8d0" },
  { id: 3, category: "Car", color: "#ffd8d0" },
  { id: 4, category: "Self care", color: "#ffd8d0" },
  { id: 5, category: "Child care", color: "#6e78e8" },
  { id: 6, category: "Household products", color: "#4a56e2" },
  { id: 7, category: "Education", color: "#81e1ff" },
  { id: 8, category: "Leisure", color: "#24cca7" },
  { id: 9, category: "Other expenses", color: "#00ad84" },
  { id: 10, category: "Entertainment", color: "#ff6596" },
];

export const expenseCategoryNames = expenseCategories.map((option) => ({
  label: option.category,
  value: option.category,
}));
