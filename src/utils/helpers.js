export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100); //cent to dollar
};

export const getUniqueValues = () => {};
