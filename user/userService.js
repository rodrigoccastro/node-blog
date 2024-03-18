const UserRepository = require('./userRepository');
const UserDto = require('./userDto');
const UserModel = require('./userModel');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users.map(user => this.modelToDto(user));
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    return user ? this.modelToDto(user) : null;
  }

  async createUser(userDto) {
    const newUser = await this.userRepository.create(userDto);
    return this.modelToDto(newUser);
  }

  async updateUser(userDto) {
    const updatedUser = await this.userRepository.update(userDto.id, userDto);
    return this.modelToDto(updatedUser);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }

  modelToDto(userModel) {
    return new UserDto(userModel.id, userModel.name, userModel.email, userModel.age, userModel.createDate);
  }
}

module.exports = UserService;