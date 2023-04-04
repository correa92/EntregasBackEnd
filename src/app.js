import express from "express";
import productsRoute from "./routers/productsRoute.js";
import cartsRoute from "./routers/cartsRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//********************************************* Main program *********************************************

try {
  app.use("/api/products", productsRoute);
  app.use("/api/carts", cartsRoute);

  app.listen(8080, () => {
    console.log("Desde el puerto 8080 con express");
  });
} catch (error) {
  console.log(error);
}
