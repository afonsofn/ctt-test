import { Product } from "@/features/products/types";
import fetch from "node-fetch";

let mockData: Product[] = [];

export const resetMockData = () => {
  mockData = [
    {
      id: "1",
      description: "Test Product 1",
      price: 19.99,
      stock: 5,
      categories: ["tech"],
    },
    {
      id: "2",
      description: "Test Product 2",
      price: 29.99,
      stock: 10,
      categories: ["wearable"],
    },
  ];
};

export const setupFetchMock = () => {
  global.fetch = jest.fn((input, options) => {
    const url = typeof input === "string" ? input : input.url;

    if (
      url.endsWith("/api/products") &&
      (!options || options.method === "GET")
    ) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      });
    }

    if (url.endsWith("/api/products") && options?.method === "POST") {
      const body = JSON.parse(options.body as string);
      const newItem = { ...body, id: crypto.randomUUID() };
      mockData.push(newItem);

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newItem),
      });
    }

    if (url.match(/\/api\/products\/\w+/) && options?.method === "DELETE") {
      const id = url.split("/").pop();
      mockData = mockData.filter((p) => p.id !== id);

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    }

    if (url.match(/\/api\/products\/\w+/) && options?.method === "PUT") {
      const id = url.split("/").pop();
      const body = JSON.parse(options.body as string);

      const index = mockData.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockData[index] = { ...mockData[index], ...body };
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData[index]),
      });
    }

    return Promise.reject(new Error("Unhandled fetch"));
  }) as jest.Mock;
};
