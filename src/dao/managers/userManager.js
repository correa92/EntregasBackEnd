import UserMongooseDao from "../UserMongooseDao.js";

class UserManager {
  constructor() {
    this.userDao = new UserMongooseDao();
  }

  async paginate(criteria) {
    return this.userDao.paginate(criteria);
  }

  async getOneByEmail(email) {
    return this.userDao.getOneByEmail(email);
  }

  async getOne(id) {
    return this.userDao.getOne(id);
  }

  async create(data) {
    const userExist = await this.getOneByEmail(data.email);

    if (userExist.id === undefined) {
      return await this.userDao.create(data);
    }

    return { id: undefined, password: undefined };
  }

  async updateOne(id, data) {
    return this.userDao.updateOne(id, data);
  }

  async deleteOne(id) {
    return this.userDao.deleteOne(id);
  }
}

export default UserManager;
