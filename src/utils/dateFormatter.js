const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

const formatDate = (date) => {
  return date.toLocaleString('en-GB', options).replace(/\//g, '-');
};

export default formatDate;
