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
  try {
    const { cid, pid } = req.params;
    const product = await classPM.getProductById(pid);
    const cart = await classCM.getCartById(cid);

    if (cart && product) {
      const response = await classCM.addProductToCart(cid, pid);
      return res.status(201).json({ data: response });
    } else {
      return res.status(400).json({ error: "Producto o Carrito Inválido" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error, no se pudo agregar producto al carrito" });
  }
});

export default cartsRoute;
