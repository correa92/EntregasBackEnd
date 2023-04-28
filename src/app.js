import express from "express";
import productsRoute from "./routers/productsRoute.js";
import cartsRoute from "./routers/cartsRoute.js";
import viewsRoute from "./routers/viewsRoute.js";
import { resolve } from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

//********************************************* Main program *********************************************
void (async () => {
  try {
    const SERVER_PORT = 8080;
    dotenv.config();

    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const viewsPath = resolve("src");
    // const socketServer = new Server(httpServer);

    // socketServer.on("connection", (socket) => {
    //   console.log("Nuevo cliente conectado");

    //   socket.on("message", async (data) => {
    //     if (data.product) {
    //       const addProduct = await classPM.addProduct(data.product);
    //       if (addProduct.Error) {
    //         return addProduct.Error;
    //       }
    //     }
    //     if (data.remove) {
    //       const removeProduct = await classPM.deleteProduct(data.remove);
    //       if (removeProduct.Error) {
    //         return removeProduct.Error;
    //       }
    //     }
    //     const getProducts = await classPM.getProducts();
    //     if (getProducts.Error) {
    //       return getProducts.Error;
    //     }
    //     socketServer.emit("paraTodos", { products: getProducts });
    //   });
    // });

    // app.engine(
    //   "handlebars",
    //   handlebars.engine({
    //     layoutsDir: `${viewsPath}/views/layouts`,
    //     defaultLayout: `${viewsPath}/views/layouts/main.handlebars`,
    //   })
    // );

    // app.set("view engine", "handlebars");
    // app.set("views", viewsPath + "/views");
    // app.use(express.static(viewsPath + "/public"));
    // app.use("/", viewsRoute);
    app.use("/api/products", productsRoute);
    app.use("/api/carts", cartsRoute);

    const httpServer = app.listen(SERVER_PORT, () => {
      console.log(`Desde el puerto ${SERVER_PORT} con express`);
    });
  } catch (error) {
    console.log(error);
  }
})();
