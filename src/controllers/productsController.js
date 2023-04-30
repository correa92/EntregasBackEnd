import ProductManager from "../dao/managers/ProductsManager.js";

export const get = async (req, res) => {
  try {
    const classPM = new ProductManager();

    const { limit } = req.query;
    const products = await classPM.find();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      return res.status(200).json({
        status: "success",
        message: "Products obtained successfully",
        data: limitedProducts,
      });
    } else {
      return res.json({
        status: "success",
        message: "Products obtained successfully",
        data: products,
      });
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

    return res
      .status(200)
      .json({
        status: "success",
        message: "Product obtained successfully",
        data: product,
      });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const classPM = new ProductManager();
    const addProduct = await classPM.create(req.body);

    return res.status(201).json({ status: "success", message: "Product created successfully",data: addProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};

export const update = async (req, res) => {
  try {
    const classPM = new ProductManager();
    const idProduct = req.params.pid;
    const body = req.body;
    const updateProduct = await classPM.updateOne(idProduct, body);

    if (updateProduct.Error) {
      return res.status(400).json({ Error: updateProduct.Error });
    }
    return res.status(201).json({
      status: "success",
      message: "Product updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const classPM = new ProductManager();
    const id = req.params.pid;
    const deleteProduct = await classPM.deleteOne(id);
    
    return res.status(200).json({ status: "success",message: "Product removed successfully", data: deleteProduct });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};
