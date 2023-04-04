import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const cartsRoute = Router();

const classCM = new CartManager();
const classPM = new ProductManager();

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
  const product = await classPM.getProductById(pid);
  const cart = await classCM.addProductToCart(cid, pid);
  //sin terminar
  res.status(201).json(product);
});

export default cartsRoute;
