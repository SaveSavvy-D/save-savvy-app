const formatAmount = (expenditure, currency) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(expenditure);
};

export default formatAmount;
