const renderPrices = (variants) => {
  const allPrices = [];
  variants.forEach(v => allPrices.push(v.price));
  if (allPrices.length === 1) {
    return `$${allPrices[0]}`;
  }
  allPrices.sort();
  return `$${allPrices[0]} - $${allPrices[allPrices.length - 1]}`;
};

export { renderPrices }; // eslint-disable-line
