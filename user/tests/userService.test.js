const UserService = require('../userService');
const UserRepository = require('../userRepository');
const UserDto = require('../userDto');

jest.mock('../userRepository');

describe('User Service', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    UserRepository.prototype.findAll.mockResolvedValue(users);
    const result = await userService.getAllUsers();
    expect(result).toEqual(users);
  });

  it('should get user by ID', async () => {
    const userId = 1;
    const user = { id: userId, name: 'John Doe' };
    UserRepository.prototype.findById.mockResolvedValue(user);
    const result = await userService.getUserById(userId);
    expect(result).toEqual(user);
  });

  it('should create a new user', async () => {
    const userData = new UserDto(null, 'John Doe', 'john@example.com', 30, null);
    const newUser = { id: 1, ...userData };
    UserRepository.prototype.create.mockResolvedValue(newUser);
    const result = await userService.createUser(userData);
    expect(result).toEqual(newUser);
  });

  it('should update an existing user', async () => {
    const userId = 1;
    const updatedUserData = new UserDto(userId, 'Updated Name', 'updated@example.com', 35, null);
    const updatedUser = { id: userId, ...updatedUserData };
    UserRepository.prototype.update.mockResolvedValue(updatedUser);
    const result = await userService.updateUser(updatedUserData);
    expect(result).toEqual(updatedUser);
  });

  it('should delete a user by ID', async () => {
      const userId = 1;
      UserRepository.prototype.delete.mockResolvedValue(true);
      const result = await userService.deleteUser(userId);
      expect(result).toBe(true);
  });

  it('should handle error when getting all users', async () => {
      const errorMessage = 'Failed to fetch users';
      UserRepository.prototype.findAll.mockRejectedValue(new Error(errorMessage));
      await expect(userService.getAllUsers()).rejects.toThrow(errorMessage);
  });

  it('should handle error when getting user by ID', async () => {
      const userId = 1;
      const errorMessage = `Failed to fetch user with ID ${userId}`;
      UserRepository.prototype.findById.mockRejectedValue(new Error(errorMessage));
      await expect(userService.getUserById(userId)).rejects.toThrow(errorMessage);
  });

  it('should handle error when creating a new user', async () => {
      const userData = new UserDto(null, 'John Doe', 'john@example.com', 30);
      const errorMessage = 'Failed to create user';
      UserRepository.prototype.create.mockRejectedValue(new Error(errorMessage));
      await expect(userService.createUser(userData)).rejects.toThrow(errorMessage);
  });

  it('should handle error when updating an existing user', async () => {
      const updatedUserData = new UserDto(1, 'Updated Name', 'updated@example.com', 35, null);
      const errorMessage = 'Failed to update user';
      UserRepository.prototype.update.mockRejectedValue(new Error(errorMessage));
      await expect(userService.updateUser(updatedUserData)).rejects.toThrow(errorMessage);
  });

  it('should handle error when deleting a user by ID', async () => {
      const userId = 1;
      const errorMessage = `Failed to delete user with ID ${userId}`;
      UserRepository.prototype.delete.mockRejectedValue(new Error(errorMessage));
      await expect(userService.deleteUser(userId)).rejects.toThrow(errorMessage);
  });
  
});