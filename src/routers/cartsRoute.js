import { Router } from "express";
import CartManager from "../CartManager.js";

const cartsRoute = Router();

const classCM = new CartManager();

cartsRoute.get("/:cid", async (req, res) => {
  let cid = req.params.cid;
  const cart = await classCM.getCartById(cid);
  res.status(200).json(cart);
});

cartsRoute.post("/", async (req, res) => {
  const createProduct = await classCM.createCart();
  res.status(201).json(createProduct);
});

cartsRoute.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const product = await classCM.addProductToCart(cid, pid);
  res.status(201).json(product);
});

export default cartsRoute;
