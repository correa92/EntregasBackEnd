import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const cartsRoute = Router();

const classCM = new CartManager();
const classPM = new ProductManager();

cartsRoute.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    const cart = await classCM.getCartById(cid);

    if (cart.Error) {
      return res.status(400).json({ Error: cart.Error });
    }
    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    return res.status(400).json({ Error: `${error}` });
  }
});

cartsRoute.post("/", async (req, res) => {
  try {
    const createProduct = await classCM.createCart();
    if (createProduct.Error) {
      return res
        .status(400)
        .json({ status: "Error", Error: createProduct.Error });
    }
    return res.status(201).json(createProduct);
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
});

cartsRoute.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await classPM.getProductById(pid);
    const cart = await classCM.getCartById(cid);

    if (cart.Error) {
      return res.status(400).json({ status: "error", Error: cart.Error });
    }

    if (product.Error) {
      return res.status(400).json({ status: "error", Error: product.Error });
    }

    const response = await classCM.addProductToCart(cid, pid);
    return res.status(201).json({ status: "success", data: response });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error, No se pudo agregar producto al carrito",
    });
  }
});

export default cartsRoute;
