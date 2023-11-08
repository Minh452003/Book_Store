import express from "express";
import { create, getAllComment, getCommentFromProduct, getOneComment, removeComment, updateComment } from "../controllers/comments.js";

const routerComment = express.Router();

routerComment.get("/comment/:productId", getCommentFromProduct)
routerComment.get("/comment/:id/detail", getOneComment)
routerComment.post("/comment", create)
routerComment.patch("/comment/:id", updateComment)
routerComment.delete("/comment/:id", removeComment)
routerComment.get("/comment", getAllComment)

export default routerComment;