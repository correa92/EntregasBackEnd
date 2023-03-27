import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

//********************************************* Main program *********************************************

const main = () => {
  try {
    const classPM = new ProductManager();

    app.get("/", async (req, res) => {
      const products = await classPM.getProducts();
      res.send(products);
    });

    app.get("/products", async (req, res) => {
      const { limit } = req.query;
      const products = await classPM.getProducts();
      if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.send(limitedProducts);
      } else {
        res.send(products);
      }
    });

    app.get("/products/:pid", async (req, res) => {
      let pid = req.params.pid;
      const product = await classPM.getProductById(pid);
      res.send(product);
    });

    app.listen(8080, () => {
      console.log("Desde el puerto 8080 con express");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
