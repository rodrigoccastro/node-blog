const { sequelizePost, Post } = require('../connect');
const PostRepository = require('../postRepository');

describe('Post Repository', () => {
  let postRepository;

  beforeAll(async () => {
    await sequelizePost.sync({ force: true });
    postRepository = new PostRepository();
  });

  afterAll(async () => {
    await sequelizePost.close();
  });

  it('should create a new post', async () => {
    const newPost = await postRepository.create({
      title: 'title 1',
      text: 'text 1',
      userId: 'c33297d7-1c5a-4fc5-9e42-3de657e57077'
    });

    expect(newPost.title).toBe('title 1');
    expect(newPost.text).toBe('text 1');
    expect(newPost.userId).toBe('c33297d7-1c5a-4fc5-9e42-3de657e57077');
  });

  it('should retrieve a post by ID', async () => {
    const createdPost = await Post.create({
      title: 'title 1',
      text: 'text 1',
      userId: 'c33297d7-1c5a-4fc5-9e42-3de657e57077'
    });

    const retrievedPost = await postRepository.findById(createdPost.id);
    expect(retrievedPost.title).toBe('title 1');
    expect(retrievedPost.text).toBe('text 1');
    expect(retrievedPost.userId).toBe('c33297d7-1c5a-4fc5-9e42-3de657e57077');
  });

  it('should update a post', async () => {
    const createdPost = await postRepository.create({
      title: 'title 1',
      text: 'text 1',
      userId: 'c33297d7-1c5a-4fc5-9e42-3de657e57077'
    });

    const updatedPost = await postRepository.update(createdPost.id, {
      title: 'title 2'
    });

    expect(updatedPost.title).toBe('title 2');
  });

  it('should delete a post', async () => {
    const createdPost = await Post.create({
      title: 'title 1',
      text: 'text 1',
      userId: 'c33297d7-1c5a-4fc5-9e42-3de657e57077'
    });

    await postRepository.delete(createdPost.id);
    const deletedPost = await Post.findByPk(createdPost.id);
    expect(deletedPost).toBeNull();
  });
});
