const { sequelizeUser, User } = require('../connect');
const UserRepository = require('../userRepository');

describe('User Repository', () => {
  let userRepository;

  beforeAll(async () => {
    await sequelizeUser.sync({ force: true });
    userRepository = new UserRepository();
  });

  afterAll(async () => {
    await sequelizeUser.close();
  });

  it('should create a new user', async () => {
    const newUser = await userRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      createDate: null
    });

    expect(newUser.name).toBe('John Doe');
    expect(newUser.email).toBe('john@example.com');
    expect(newUser.age).toBe(30);
  });

  it('should retrieve a user by ID', async () => {
    const createdUser = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 25
    });

    const retrievedUser = await userRepository.findById(createdUser.id);

    expect(retrievedUser.name).toBe('Jane Doe');
    expect(retrievedUser.email).toBe('jane@example.com');
    expect(retrievedUser.age).toBe(25);
  });

  it('should update a user', async () => {
    const createdUser = await User.create({
      name: 'Alice',
      email: 'alice@example.com',
      age: 28
    });

    const updatedUser = await userRepository.update(createdUser.id, {
      name: 'Alice Smith'
    });

    expect(updatedUser.name).toBe('Alice Smith');
  });

  it('should delete a user', async () => {
    const createdUser = await User.create({
      name: 'Bob',
      email: 'bob@example.com',
      age: 35
    });

    await userRepository.delete(createdUser.id);
    const deletedUser = await User.findByPk(createdUser.id);
    expect(deletedUser).toBeNull();
  });
});
