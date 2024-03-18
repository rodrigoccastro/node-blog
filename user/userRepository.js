const { User } = require('./connect');
const { v4: uuidv4 } = require('uuid');

class UserRepository {
  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async create(userData) {
    userData.id = uuidv4();
    userData.createDate = Date.now();
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    userData.createDate = user.createDate;
    return await user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }
}

module.exports = UserRepository;
