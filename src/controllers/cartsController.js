import CartManager from "../dao/managers/CartsManager.js";

export const findOne = async (req, res) => {
  try {
    const classCM = new CartManager();
    let cid = req.params.cid;

    const cart = await classCM.getOne(cid);

    return res.status(200).json({
      status: "success",
      message: "Cart obtained successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(400).json({ status: "error", Error: error });
  }
};

export const createCart = async (req, res) => {
  try {
    const classCM = new CartManager();
    const addProduct = await classCM.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "Cart created successfully",
      data: addProduct,
    });
  } catch (error) {
    return res.status(400).json({ status: "Error", Error: error });
  }
};

export const updateCart = async (req, res) => {
  try {
    const classCM = new CartManager();

    let { cid, pid } = req.params;

    const response = await classCM.addToCart(cid, pid);

    if (response.Error) {
      return res.status(400).json({
        status: "error",
        message: Error,
        Error: error,
      });
    }

    return res.status(201).json({ status: "success", data: response });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Could not add product to cart",
      Error: error,
    });
  }
};
