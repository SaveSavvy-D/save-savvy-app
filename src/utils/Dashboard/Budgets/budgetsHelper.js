export const getGroupedBudgets = (groupedExpenses, budgets) => {
  return groupedExpenses.reduce((groupedBudgets, expense) => {
    const matchingBudget = budgets.find(
      (budget) => expense.category === budget.categoryId.title
    );
    if (matchingBudget) {
      groupedBudgets.push({
        threshold: matchingBudget.threshold,
        endDate: matchingBudget.endDate,
        used: expense.Amount,
        category: expense.category,
        remaining: matchingBudget.threshold - expense.Amount,
      });
    }
    return groupedBudgets;
  }, []);
};
