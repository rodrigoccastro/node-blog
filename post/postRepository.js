const { Post } = require('./connect');
const { v4: uuidv4 } = require('uuid');

class PostRepository {
  async findAll() {
    return await Post.findAll();
  }

  async findById(id) {
    return await Post.findByPk(id);
  }

  async create(postData) {
    postData.id = uuidv4();
    postData.createDate = Date.now();
    return await Post.create(postData);
  }

  async update(id, postData) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error('Post not found');
    }
    postData.createDate = post.createDate;
    return await post.update(postData);
  }

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error('Post not found');
    }
    await post.destroy();
  }
}

module.exports = PostRepository;
