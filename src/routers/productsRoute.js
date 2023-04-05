import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productsRoute = Router();

const classPM = new ProductManager();

productsRoute.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await classPM.getProducts();

    if (products.Error) {
      return res.status(400).json({ Error: products.Error });
    }

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      return res.status(200).json({ status: "success", data: limitedProducts });
    } else {
      return res.json({ status: "success", data: products });
    }
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
});

productsRoute.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const product = await classPM.getProductById(pid);
    if (product.Error) {
      return res.status(400).json({ Error: product.Error });
    }
    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
});

productsRoute.post("/", async (req, res) => {
  try {
    const addProduct = await classPM.addProduct(req.body);

    if (addProduct.Error) {
      return res.status(400).json({ Error: addProduct.Error });
    }
    return res.status(201).json({ status: "success", data: addProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
});

productsRoute.put("/:pid", async (req, res) => {
  try {
    const idProduct = req.params.pid;
    const body = req.body;
    const updateProduct = await classPM.updateProduct(idProduct, body);
    if (updateProduct.Error) {
      return res.status(400).json({ Error: updateProduct.Error });
    }
    return res.status(200).json({ status: "success", data: updateProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
});

productsRoute.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const deleteProduct = await classPM.deleteProduct(id);
    return res.status(200).json({ status: "success", data: deleteProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
});

export default productsRoute;
