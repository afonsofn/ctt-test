import { formatPrice, validateFields } from "@/features/products/utils";

import { Product } from "@/features/products/types";
import { areArraysEqual } from "@/features/products/utils/areArraysEqual";
import { getCategoryLabels } from "@/features/products/utils/categoryUtils";

describe("Utils", () => {
  describe("formatPrice", () => {
    it('formats "1234" as "12,34"', () => {
      expect(formatPrice("1234")).toBe("12,34");
    });

    it('formats "12" as "0,12"', () => {
      expect(formatPrice("12")).toBe("0,12");
    });

    it('formats "1" as "0,01"', () => {
      expect(formatPrice("1")).toBe("0,01");
    });

    it("removes non-digit characters", () => {
      expect(formatPrice("€ 5,00")).toBe("5,00");
    });

    it('defaults to "0,00" for empty string', () => {
      expect(formatPrice("")).toBe("0,00");
    });
  });

  describe("validateFields", () => {
    const existingProducts: Product[] = [
      {
        id: "1",
        description: "iPhone",
        price: 1000,
        stock: 10,
        categories: ["tech"],
      },
    ];

    it("returns error when fields are empty", () => {
      const result = validateFields("", NaN, NaN, [], existingProducts);
      expect(result).toBe("All fields are required.");
    });

    it("returns error when price or stock is zero or less", () => {
      const result = validateFields(
        "New Product",
        0,
        5,
        ["tech"],
        existingProducts
      );
      expect(result).toBe("Price and stock must be greater than zero.");
    });

    it("returns error if product description already exists (case-insensitive)", () => {
      const result = validateFields(
        "iphone",
        999,
        2,
        ["tech"],
        existingProducts
      );
      expect(result).toBe("A product with this description already exists.");
    });

    it("allows duplicate description in edit mode", () => {
      const result = validateFields(
        "iPhone",
        999,
        2,
        ["tech"],
        existingProducts,
        true
      );
      expect(result).toBeNull();
    });

    it("returns null if all fields are valid", () => {
      const result = validateFields(
        "MacBook",
        1500,
        5,
        ["tech"],
        existingProducts
      );
      expect(result).toBeNull();
    });
  });

  describe("areArraysEqual", () => {
    it("returns true for two arrays with same elements in same order", () => {
      expect(areArraysEqual(["a", "b"], ["a", "b"])).toBe(true);
    });

    it("returns true for two arrays with same elements in different order", () => {
      expect(areArraysEqual(["b", "a"], ["a", "b"])).toBe(true);
    });

    it("returns false for arrays with different lengths", () => {
      expect(areArraysEqual(["a", "b"], ["a"])).toBe(false);
    });

    it("returns false for arrays with different elements", () => {
      expect(areArraysEqual(["a", "b"], ["a", "c"])).toBe(false);
    });

    it("returns true for two empty arrays", () => {
      expect(areArraysEqual([], [])).toBe(true);
    });

    it("returns false if one array is empty and the other is not", () => {
      expect(areArraysEqual([], ["a"])).toBe(false);
    });
  });

  describe("getCategoryLabels", () => {
    it("returns correct labels for given IDs", () => {
      expect(getCategoryLabels(["tech", "laptop"])).toEqual(["Tech", "Laptop"]);
    });

    it("returns empty array if no matching IDs", () => {
      expect(getCategoryLabels(["nonexistent"])).toEqual([]);
    });

    it("filters out invalid/null entries", () => {
      expect(getCategoryLabels(["tech", "unknown", "phone"])).toEqual(["Tech"]);
    });

    it("returns empty array when input is empty", () => {
      expect(getCategoryLabels([])).toEqual([]);
    });
  });
});
