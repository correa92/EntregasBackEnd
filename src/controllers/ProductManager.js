import fs from "fs/promises";

export default class ProductManager {
  idAuto = 1;
  #products;

  constructor() {
    this.#products = [];
    this.path = "./src/db/products.json";
  }

  //methods
  async addProduct(objet) {
    try {
      const fileProducts = await fs.readFile(this.path, { encoding: "utf-8" });
      this.#products = JSON.parse(fileProducts);

      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      } = objet;

      //I verify that the fields have the correct data types and that they are not empty
      const cleanTitle = title.trim();
      const cleanDescription = description.trim();
      const cleanCode = code.trim(); //it will be considered alphanumeric
      const cleanCategory = category.trim();

      if (
        cleanTitle.length === 0 ||
        cleanDescription.length === 0 ||
        cleanCode.length === 0 ||
        cleanCategory.length === 0
      ) {
        return "Debe completar todos los campos correctamente!";
      } else if (price <= 0 || stock < 0) {
        return "Debe ingresar valores positivos!";
      } else if (isNaN(price) || isNaN(stock)) {
        return "Debe ingresar valores numéricos!";
      }

      //before creating an object, I check if the product is in the product array
      const codeProduct = this.#products.find(
        (prod) => prod.code === cleanCode
      );

      if (codeProduct) {
        return "El producto que desea ingresar ya se encuentra en la lista";
      }

      const newProduct = {
        title: cleanTitle,
        description: cleanDescription,
        price: price,
        thumbnail: thumbnail ? thumbnail : [],
        code: cleanCode,
        stock: stock,
        category: cleanCategory,
        status: status == undefined ? true : false,
      };

      // get max id of the list
      this.#products.forEach((prod) => {
        if (prod.id + 1 > this.idAuto) {
          this.idAuto = prod.id + 1;
        }
      });

      this.#products.push({ ...newProduct, id: this.idAuto });
      this.idAuto++;

      await fs.writeFile(this.path, JSON.stringify(this.#products));
      return "Producto Agregado correctamente!";
    } catch (er) {
      return { Error: er };
    }
  }

  async getProducts() {
    try {
      const fileProducts = await fs.readFile(this.path, { encoding: "utf-8" });

      this.#products = JSON.parse(fileProducts);

      return this.#products;
    } catch (er) {
      await fs.writeFile(this.path, "[]");
      return [];
    }
  }

  async getProductById(idProduct) {
    try {
      const fileProducts = await fs.readFile(this.path, { encoding: "utf-8" });

      this.#products = JSON.parse(fileProducts);

      const product = this.#products.find((prod) => prod.id == idProduct);
      if (product) {
        return product;
      }
      return { Error: "El producto no existe" };
    } catch (error) {
      return { Error: `${error}` };
    }
  }

  async updateProduct(idProduct, setObjet) {
    try {
      const fileProducts = await fs.readFile(this.path, { encoding: "utf-8" });

      this.#products = JSON.parse(fileProducts);

      const keys = Object.keys(setObjet);
      const values = Object.values(setObjet);

      for (const i of keys) {
        if (i == "id") {
          return "No se puede modificar el id!";
        }
      }

      const product = this.#products.find((prod) => prod.id == idProduct);

      if (product) {
        for (let i = 0; i < keys.length; i++) {
          product[keys[i]] = values[i];
        }
        await fs.writeFile(this.path, JSON.stringify(this.#products));
      } else {
        return "No se encontro el producto!";
      }
      return product;
    } catch (error) {
      return { Error: error };
    }
  }

  async deleteProduct(idProduct) {
    try {
      const fileProducts = await fs.readFile(this.path, { encoding: "utf-8" });

      this.#products = JSON.parse(fileProducts);

      const indexProduct = this.#products.findIndex(
        (prod) => prod.id == idProduct
      );

      if (indexProduct != -1) {
        this.#products.splice(indexProduct, 1);

        await fs.writeFile(this.path, JSON.stringify(this.#products));
        return;
      } else {
        return "No se puede borrar un producto que no existe!";
      }
    } catch (error) {
      return { Error: error };
    }
  }
} //end class ProductoManager
