import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productsRoute = Router();

const classPM = new ProductManager();

productsRoute.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await classPM.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.status(200).json(limitedProducts);
  } else {
    res.json(products);
  }
});

productsRoute.get("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const product = await classPM.getProductById(pid);
  res.status(200).json(product);
});

productsRoute.post("/", async (req, res) => {
  const addProduct = await classPM.addProduct(req.body);
  res.status(201).json(addProduct);
});

productsRoute.put("/:pid", async (req, res) => {
  const idProduct = req.params.pid;
  const body = req.body;
  const updateProduct = await classPM.updateProduct(idProduct, body);
  res.status(200).json(updateProduct);
});

productsRoute.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const deleteProduct = await classPM.deleteProduct(id);
  res.status(200).json(deleteProduct);
});

export default productsRoute;
