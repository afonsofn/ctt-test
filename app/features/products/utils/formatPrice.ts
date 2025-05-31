export const formatPrice = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const euros = digitsOnly.slice(0, -2) || "0";
  const cents = digitsOnly.slice(-2).padStart(2, "0");
  return `${parseInt(euros, 10)},${cents}`;
};
