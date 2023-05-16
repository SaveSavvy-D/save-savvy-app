import formatDate from '../../dateFormatter';

export const getGroupedExpenses = (expenses) => {
  const groupedExpenses = expenses.reduce((acc, curr) => {
    const categoryId = curr.category._id;
    const amount = curr.amount;
    const category = curr.category.title;

    acc[categoryId] = acc[categoryId] || {
      _id: categoryId,
      category,
      Amount: 0,
    };
    acc[categoryId].Amount += amount;

    return acc;
  }, {});

  return Object.values(groupedExpenses);
};

export const getExpenseBarChartData = (expenses) => {
  const groupedData = expenses.reduce((acc, { date, category, amount }) => {
    const dateStr = formatDate(new Date(date));
    acc[dateStr] = acc[dateStr] || {};
    acc[dateStr][category.title] = (acc[dateStr][category.title] || 0) + amount;
    return acc;
  }, {});

  return Object.entries(groupedData)
    .map(([date, categories]) => ({
      date,
      ...categories,
      total: Object.values(categories).reduce(
        (total, amount) => total + amount
      ),
    }))
    .reverse();
};
