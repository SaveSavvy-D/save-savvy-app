const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

export const formatDate = (date) => {
  return date.toLocaleString('en-GB', options).replace(/\//g, '-');
};

export const getDate = () => {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: (now.getMonth() + 1).toString().padStart(2, '0'),
  };
};
