const UserController = require('../userController');
const UserService = require('../userService');
const UserDto = require('../userDto');
jest.mock('../userService');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    UserService.prototype.getAllUsers.mockResolvedValue(users);
    await UserController.getAllUsers(req, res);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('should get user by ID', async () => {
    const userId = 1;
    const user = { id: userId, name: 'John Doe' };
    req.params = { id: userId };
    UserService.prototype.getUserById.mockResolvedValue(user);
    await UserController.getUserById(req, res);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('should create a new user', async () => {
    const userData = new UserDto('John Doe', 'john@example.com', 30);
    const newUser = { id: null, ...userData };
    req.body = userData;
    UserService.prototype.createUser.mockResolvedValue(newUser);
    await UserController.createUser(req, res);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  it('should update an existing user', async () => {
    const userId = "uuid-1234";
    const userData = new UserDto(userId, 'Jane Smith', 'jane@example.com', 25);
    req.params = { id: userId };
    req.body = userData;
    UserService.prototype.updateUser.mockResolvedValue(userData);
    await UserController.updateUser(req, res);
    expect(res.json).toHaveBeenCalledWith(userData);
  });

  it('should delete a user', async () => {
    const userId = "uuid-1234";
    req.params = { id: userId };
    UserService.prototype.deleteUser.mockResolvedValue();
    await UserController.deleteUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Object deleted' });
  });

});
