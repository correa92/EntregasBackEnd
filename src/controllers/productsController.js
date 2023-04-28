import ProductManager from "../dao/managers/ProductsManager.js";

export const get = async (req, res) => {
  try {
    const classPM = new ProductManager();

    const { limit } = req.query;
    const products = await classPM.find();
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
};

export const findOne = async (req, res) => {
  try {
    const classPM = new ProductManager();
    let pid = req.params.pid;
    const product = await classPM.findOne(pid);
    if (product.Error) {
      return res.status(400).json({ Error: product.Error });
    }
    return res.status(200).json({ status: "success", data: product });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const classPM = new ProductManager();
    const addProduct = await classPM.create(req.body);

    if (addProduct.Error) {
      return res.status(400).json({ Error: addProduct.Error });
    }
    return res.status(201).json({ status: "success", data: addProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};

export const update = async (req, res) => {
  try {
    const classPM = new ProductManager();
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
};

export const deleteOne = async (req, res) => {
  try {
    const classPM = new ProductManager();
    const id = req.params.pid;
    const deleteProduct = await classPM.deleteProduct(id);
    return res.status(200).json({ status: "success", data: deleteProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};
