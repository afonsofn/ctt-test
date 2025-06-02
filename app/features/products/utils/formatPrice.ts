export const formatPrice = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "");
  const euros = digitsOnly.slice(0, -2) || "0";
  const cents = digitsOnly.slice(-2).padStart(2, "0");
  return `${parseInt(euros, 10)},${cents}`;
};

export const formatPriceFromEuros = (value: string | number) => {
  const euros =
    typeof value === "number" ? value : parseFloat(value.replace(",", "."));
  const [intPart, decPart = "00"] = euros.toFixed(2).split(".");
  return `${intPart},${decPart}`;
};
