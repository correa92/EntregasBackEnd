import ProductMongooseDao from "../ProductMongooseDao.js";

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
  }

  async find() {
    return this.productDao.find();
  }

  async findOne(id) {
    return this.productDao.findOne(id);
  }

  async create(data) {
    return await this.productDao.create(data);
  }

  async updateOne(id, data) {
    return this.productDao.updateOne(id, data);
  }

  async deleteOne(id) {
    return this.productDao.deleteOne(id);
  }
}

export default ProductManager;
