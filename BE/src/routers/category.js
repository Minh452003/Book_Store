import express from "express";
import { addCategory, getAllCategory, getAllDelete, getCategoryById, removeCategory, removeForce, restoreCategory, updateCategory } from "../controllers/category.js";

const routerCategory = express.Router();

routerCategory.get("/category", getAllCategory)
routerCategory.get("/category/delete", getAllDelete)
routerCategory.get("/category/:id", getCategoryById)
routerCategory.delete("/category/:id", removeCategory)
routerCategory.delete("/category/force/:id", removeForce)
routerCategory.post("/category", addCategory)
routerCategory.patch("/category/:id", updateCategory)
routerCategory.patch("/category/restore/:id", restoreCategory)


export default routerCategory;