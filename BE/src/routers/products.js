import express from "express";
import { addProduct, get, getAll, getAllDelete, remove, removeForce, restoreProduct, updateProduct } from "../controllers/products.js";
const routerProducts = express.Router();

routerProducts.get("/products", getAll);
routerProducts.get("/products/delete", getAllDelete);
routerProducts.get("/products/:id", get);
routerProducts.delete("/products/:id", remove);
routerProducts.delete("/products/force/:id", removeForce);
routerProducts.post("/products", addProduct);
routerProducts.patch("/products/:id", updateProduct);
routerProducts.patch("/products/restore/:id", restoreProduct);


export default routerProducts;