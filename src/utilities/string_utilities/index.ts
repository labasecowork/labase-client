export const formatPrice = (price: string): string => {
  const numericPrice = parseFloat(price);
  return `S/ ${numericPrice.toFixed(2)}`;
};
