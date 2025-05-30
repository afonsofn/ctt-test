export const generateMockProducts = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${i + 1}`,
    description: `Product ${i + 1}`,
    price: 10,
    stock: 1,
    categories: [],
  }));
};
