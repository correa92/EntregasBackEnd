import productSchema from "./models/productSchema.js";

class ProductMongooseDao {
  async find() {
    const productDocument = await productSchema.find();

    return productDocument.map((doc) => ({
      title: doc.title,
      description: doc.description,
      price: doc.price,
      thumbnail: doc.thumbnail,
      code: doc.code,
      stock: doc.stock,
      category: doc.category,
      status: doc.status,
      id: doc.id,
    }));
  }

  async findOne(id) {
    const productDocument = await productSchema.findOne({ _id: id });

    return {
      title: productDocument?.title,
      description: productDocument?.description,
      price: productDocument?.price,
      thumbnail: productDocument?.thumbnail,
      code: productDocument?.code,
      stock: productDocument?.stock,
      category: productDocument?.category,
      status: productDocument?.status,
      id: productDocument?.id,
    };
  }

  async create(data) {
    const productDocument = await productSchema.create(data);

    return {
      title: productDocument.title,
      description: productDocument.description,
      price: productDocument.price,
      thumbnail: productDocument.thumbnail,
      code: productDocument.code,
      stock: productDocument.stock,
      category: productDocument.category,
      status: productDocument.status,
      id: productDocument.id,
    };
  }

  async updateOne(id, data) {
    const productDocument = await productSchema.findOneAndUpdate({ _id: id },data,{ new: true });

    if (!productDocument) {
      throw new Error("The product does not exist");
    }
    return {
      title: productDocument?.title,
      description: productDocument?.description,
      price: productDocument?.price,
      thumbnail: productDocument?.thumbnail,
      code: productDocument?.code,
      stock: productDocument?.stock,
      category: productDocument?.category,
      status: productDocument?.status,
      id: productDocument?.id,
    };
  }

  async deleteOne(id) {
    return productSchema.deleteOne({ _id: id });
  }
}

export default ProductMongooseDao;