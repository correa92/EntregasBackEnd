import fs from "fs";

export default class CartManager {
  idAuto = 1;
  #carts;
  #products;

  constructor() {
    this.#carts = [];
    this.#products = [];
    this.path = "./src/db/carts.json";
    this.pathProducts = "./src/db/products.json";
  }

  //methods
  async createCart() {
    try {
      if (fs.existsSync(this.path)) {
        const fileCarts = await fs.promises.readFile(this.path, {
          encoding: "utf-8",
        });
        this.#carts = JSON.parse(fileCarts);

        // get max id of the list
        this.#carts.forEach((cart) => {
          if (cart.id + 1 > this.idAuto) {
            this.idAuto = cart.id + 1;
          }
        });

        const cart = {
          id: this.idAuto,
          products: [],
        };

        this.#carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));

        return "Carrito creado correctamente!";
      } else {
        return await fs.promises.writeFile(
          this.path,
          JSON.stringify([{ id: 1, products: [] }])
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      // verify exist the file carts
      if (fs.existsSync(this.path)) {
        const fileCarts = await fs.promises.readFile(this.path, {
          encoding: "utf-8",
        });
        this.#carts = JSON.parse(fileCarts);
      } else {
        return { Error: "Error: No se puede leer el archivo" };
      }

      // verify exist the file products
      if (fs.existsSync(this.pathProducts)) {
        const fileProducts = await fs.promises.readFile(this.pathProducts, {
          encoding: "utf-8",
        });
        this.#products = JSON.parse(fileProducts);
      } else {
        return { Error: "Error: No se puede leer el archivo" };
      }

      let indexCart;
      let cart;

      // verify that the cart exist
      this.#carts.forEach((elemento, index) => {
        if (elemento.id == idCart) {
          cart = elemento;
          indexCart = index;
        }
      });

      // verify that the product exist
      const productInFile = this.#products.find((prod) => prod.id == idProduct);

      if (!cart) {
        return { Error: "El carrito seleccionado no existe!" };
      }
      if (!productInFile) {
        return { Error: "El producto seleccionado no existe!" };
      }

      //verify that the product exist in the list of cart
      const indexProducts = cart.products.findIndex(
        (el) => el.product == productInFile.id
      );

      if (indexProducts != -1) {
        // If the product is in the cart then increase its quantity
        const increment = cart.products[indexProducts].quantity + 1;

        this.#carts[indexCart].products[indexProducts] = {
          ...this.#carts[indexCart].products[indexProducts],
          product: idProduct,
          quantity: increment,
        };
      } else {
        this.#carts[indexCart].products.push({
          ...this.#carts[indexCart].products[indexProducts],
          product: idProduct,
          quantity: 1,
        });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));
      return "Producto Agregado correctamente!";
    } catch (er) {
      console.log(er);
    }
  }

  async getCartById(idCart) {
    try {
      if (fs.existsSync(this.path)) {
        const fileCart = await fs.promises.readFile(this.path, {
          encoding: "utf-8",
        });

        this.#carts = JSON.parse(fileCart);

        const cart = this.#carts.find((cart) => cart.id == idCart);

        if (cart) {
          if (cart.products.length === 0) {
            return "El carrito se encuentra vacío";
          }
          return cart.products;
        } else {
          return { Error: "El carrito no existe" };
        }
      } else {
        return { Error: "Error al leer el archivo" };
      }
    } catch (error) {
      console.log(error);
    }
  }
} //end class CartManager
