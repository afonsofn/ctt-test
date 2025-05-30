import { readData, writeData } from "../utils/fileHandler.js";

export const getProducts = (req, res) => {
  const data = readData();
  res.json(data.products);
};

export const createProduct = (req, res) => {
  const data = readData();
  const newProduct = { ...req.body, id: crypto.randomUUID() };
  data.products.push(newProduct);
  writeData(data);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  data.products[index] = { ...data.products[index], ...req.body };
  writeData(data);
  res.json(data.products[index]);
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  const deleted = data.products.splice(index, 1)[0];
  writeData(data);
  res.json(deleted);
};
