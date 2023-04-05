import fs from "fs/promises";

export default class ProductManager {
  idAuto = 1;
  #products;

  constructor() {
    this.#products = [];
    this.path = "./src/db/products.json";
  }

  //methods
  async readData() {
    try {
      const data = await fs.readFile(this.path, { encoding: "utf-8" });
      return JSON.parse(data);
    } catch (error) {
      await fs.writeFile(this.path, "[]");
      return { Error: error };
    }
  }

  async addProduct(objet) {
    try {
      this.#products = await this.readData();

      if (this.#products.Error) {
        return { Error: this.#products.Error };
      }
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
        return { Error: "Debe completar todos los campos correctamente!" };
      } else if (price <= 0 || stock < 0) {
        return { Error: "Debe ingresar valores positivos!" };
      } else if (isNaN(price) || isNaN(stock)) {
        return { Error: "Debe ingresar valores numéricos!" };
      }

      //before creating an object, I check if the product is in the product array
      const codeProduct = this.#products.find(
        (prod) => prod.code === cleanCode
      );

      if (codeProduct) {
        return {
          Error: "El producto que desea ingresar ya se encuentra en la lista",
        };
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
    } catch (error) {
      return { Error: error };
    }
  }

  async getProducts() {
    try {
      this.#products = await this.readData();
      if (this.#products.Error) {
        return { Error: this.#products.Error };
      }
      return this.#products;
    } catch (error) {
      return { Error: error };
    }
  }

  async getProductById(idProduct) {
    try {
      this.#products = await this.readData();

      if (this.#products.Error) {
        return { Error: this.#products.Error };
      }

      const product = this.#products.find((prod) => prod.id == idProduct);
      if (product) {
        return product;
      }
      return { Error: "El producto no existe" };
    } catch (error) {
      return { Error: error };
    }
  }

  async updateProduct(idProduct, setObjet) {
    try {
      this.#products = await this.readData();

      if (this.#products.Error) {
        return { Error: this.#products.Error };
      }

      const keys = Object.keys(setObjet);
      const values = Object.values(setObjet);

      for (const i of keys) {
        if (i == "id") {
          return { Error: "No se puede modificar el id!" };
        }
      }

      const product = this.#products.find((prod) => prod.id == idProduct);

      if (product) {
        for (let i = 0; i < keys.length; i++) {
          product[keys[i]] = values[i];
        }
        await fs.writeFile(this.path, JSON.stringify(this.#products));
      } else {
        return { Error: "No se encontro el producto!" };
      }
      return product;
    } catch (error) {
      return { Error: error };
    }
  }

  async deleteProduct(idProduct) {
    try {
      this.#products = await this.readData();

      if (this.#products.Error) {
        return { Error: this.#products.Error };
      }

      const indexProduct = this.#products.findIndex(
        (prod) => prod.id == idProduct
      );

      if (indexProduct != -1) {
        this.#products.splice(indexProduct, 1);

        await fs.writeFile(this.path, JSON.stringify(this.#products));
        return "Producto eliminado correctamente";
      } else {
        return { Error: "No se puede borrar un producto que no existe!" };
      }
    } catch (error) {
      return { Error: error };
    }
  }
} //end class ProductoManager
