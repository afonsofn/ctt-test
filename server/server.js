import { readData, writeData } from "./utils/fileHandler.js";

import express from "express";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());

const initializeProducts = () => {
  const data = readData();

  if (data.products.length === 0) {
    data.products = [
      {
        id: crypto.randomUUID(),
        description: "iPhone 15 Pro",
        price: 1199,
        stock: 10,
        categories: ["tech"],
      },
      {
        id: crypto.randomUUID(),
        description: "MacBook Air M2",
        price: 999,
        stock: 5,
        categories: ["laptop"],
      },
    ];
    writeData(data);
    console.log("Produtos iniciais criados com sucesso.");
  }
};

initializeProducts();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
