import fs from "fs";

export default class CartManager {
  idAuto = 1;
  #carts;

  constructor() {
    this.#carts = [];
    this.path = "./src/db/carts.json";
  }

  //methods
  async createCart() {
    try {
      this.#carts = await this.getCarts();

      if (this.#carts.Error) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([{ id: 1, products: [] }])
        );
        return "Carrito creado correctamente!";
      }

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
    } catch (error) {
      return { Error: `${error}` };
    }
  }

  async getCarts() {
    try {
      // verify exist the file carts
      if (fs.existsSync(this.path)) {
        const fileCarts = await fs.promises.readFile(this.path, {
          encoding: "utf-8",
        });
        return JSON.parse(fileCarts);
      } else {
        return { Error: "No se puede leer el archivo" };
      }
    } catch (error) {
      return { Error: `${error}` };
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      let indexCart;
      let cart;

      this.#carts = await this.getCarts();

      if (this.#carts.Error) {
        return { Error: this.#carts.Error };
      }

      // verify that the cart exist
      this.#carts.forEach((elemento, index) => {
        if (elemento.id == idCart) {
          cart = elemento;
          indexCart = index;
        }
      });

      if (!cart) {
        return { Error: "El carrito seleccionado no existe!" };
      }

      //verify that the product exist in the list of cart
      const indexProducts = cart.products.findIndex(
        (el) => el.product == idProduct
      );

      if (indexProducts != -1) {
        // If the product is in the cart then increase its quantity
        this.#carts[indexCart].products[indexProducts].quantity++;
      } else {
        const newProduct = {
          product: idProduct,
          quantity: 1,
        };
        this.#carts[indexCart].products.push(newProduct);
      }

      await fs.promises.writeFile(this.path, JSON.stringify(this.#carts));

      return "Producto Agregado correctamente!";
    } catch (er) {
      return { Error: `${er}` };
    }
  }

  async getCartById(idCart) {
    try {
      this.#carts = await this.getCarts();

      if (this.#carts.Error) {
        return { Error: this.#carts.Error };
      }
      const cart = this.#carts.find((cart) => cart.id == idCart);

      if (cart) {
        return cart.products;
      } else {
        return { Error: "El carrito no existe" };
      }
    } catch (error) {
      return { Error: `${error}` };
    }
  }
} //end class CartManager
