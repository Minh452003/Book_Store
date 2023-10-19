import express from "express";
import { getAll, get, create, remove, update } from "../controllers/blog.js";

const routerBlog = express.Router();
routerBlog.get("/blogs", getAll);
routerBlog.get("/blogs/:id", get);
routerBlog.post("/blogs", create);
routerBlog.delete("/blogs/:id", remove);
routerBlog.patch("/blogs/:id", update);
export default routerBlog;
