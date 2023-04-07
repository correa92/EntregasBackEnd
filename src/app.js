import express from "express";
import productsRoute from "./routers/productsRoute.js";
import cartsRoute from "./routers/cartsRoute.js";
import viewsRoute from "./routers/viewsRoute.js";
import handlebars from "express-handlebars";
import { resolve } from "path";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//********************************************* Main program *********************************************

try {
  const SERVER_PORT = 8080;

  const httpServer = app.listen(SERVER_PORT, () => {
    console.log(`Desde el puerto ${SERVER_PORT} con express`);
  });

  const socketServer = new Server(httpServer);
  const viewsPath = resolve("src");

  socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    const productsList = [];

    socket.on("message",data=>{
      socketServer.emit("paraTodos",data);
    })
    
  });

  app.engine(
    "handlebars",
    handlebars.engine({
      layoutsDir: `${viewsPath}/views/layouts`,
      defaultLayout: `${viewsPath}/views/layouts/main.handlebars`,
    })
  );

  app.set("view engine", "handlebars");
  app.set("views", viewsPath + "/views");
  app.use(express.static(viewsPath + "/public"));
  app.use("/", viewsRoute);
  app.use("/api/products", productsRoute);
  app.use("/api/carts", cartsRoute);
} catch (error) {
  console.log(error);
}
