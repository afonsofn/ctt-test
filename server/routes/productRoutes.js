import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from "../controllers/productController.js";

import { Router } from "express";

const router = Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
