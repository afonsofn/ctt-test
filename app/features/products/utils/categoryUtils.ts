import { CATEGORIES } from "../constants/categories";

export const getCategoryLabels = (ids: string[]): string[] => {
  return ids
    .map((id) => CATEGORIES.find((c) => c.id === id)?.label)
    .filter((label): label is string => Boolean(label));
};
