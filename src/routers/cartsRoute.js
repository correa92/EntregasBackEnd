import { Router } from "express";
import { createCart, findOne, updateCart } from "../controllers/cartsController.js";

const cartsRoute = Router();

cartsRoute.get("/:cid", findOne);

cartsRoute.post("/", createCart);

cartsRoute.post("/:cid/product/:pid", updateCart);

export default cartsRoute;
