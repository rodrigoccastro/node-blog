const UserService = require('./userService');
const UserDto = require('./userDto');
const userService = new UserService();
const Controller = require('./controller'); 

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        Controller.responseList(res, users);
    } catch (err) {
        return Controller.responseMessage(res, Controller.getStatusError(), err.message);
    }
}

async function getUserById(req, res) {
    try {
        const id = Controller.getId(req);
        const user = await userService.getUserById(id);
        if (!user) {
            return Controller.responseMessage(res, Controller.getStatusNotFound(), Controller.getTextMessageUserNotFound());
        }
        Controller.responseObject(res, user);
    } catch (err) {
        Controller.responseMessage(res, Controller.getStatusError(), err.message);
    }
}

async function createUser(req, res) {
    try {
        await validateUserInput(req);
        const { name, email, age } = req.body;
        const userDto = new UserDto(null, name, email, age);
        const newUser = await userService.createUser(userDto);
        res.status(Controller.getStatusSuccess()).json(newUser);
    } catch (err) {
        Controller.responseMessage(res, Controller.getStatusError(), err.message);
    }
}

async function updateUser(req, res) {
  try {
    const id = Controller.getId(req);
    await validateUserInput(req);
    const { name, email, age } = req.body;
    const userDto = new UserDto(id, name, email, age);
    const updatedUser = await userService.updateUser(userDto);
    Controller.responseObject(res, updatedUser)
  } catch (err) {
    Controller.responseMessage(res, Controller.getStatusError(), err.message) 
  }
}

async function deleteUser(req, res) {
  try {
    const id = Controller.getId(req);
    await userService.deleteUser(id);
    Controller.responseMessage(res, Controller.getStatusSuccess(), Controller.getTextMessageDeleted()) 
  } catch (err) {
    Controller.responseMessage(res, Controller.getStatusError(), err.message) 
  }
}

async function validateUserInput(req) {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new Error(Controller.getTextMessageBodySaveNotFound());
  }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};