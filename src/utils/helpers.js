export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100); //cent to dollar
};

export const getUniqueValues = (data, type) => {
  let mapItems = data.map((item) => item[type]);
  if (type === 'colors') {
    return ['all', ...new Set(mapItems.flat())]; //using flat() to get all elements in subarrays and flat as new array
  }
  return ['all', ...new Set(mapItems)]; //using Set to get unique elements
};
