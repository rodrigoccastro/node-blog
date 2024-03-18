const PostRepository = require('./postRepository');
const PostDto = require('./postDto');
const PostModel = require('./postModel');

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll();
    return posts.map(post => this.modelToDto(post));
  }

  async getPostById(id) {
    const post = await this.postRepository.findById(id);
    return post ? this.modelToDto(post) : null;
  }

  async createPost(postDto) {
    const newPost = await this.postRepository.create(postDto);
    return this.modelToDto(newPost);
  }

  async updatePost(postDto) {
    const updatedPost = await this.postRepository.update(postDto.id, postDto);
    return this.modelToDto(updatedPost);
  }

  async deletePost(id) {
    return await this.postRepository.delete(id);
  }

  modelToDto(postModel) {
    return new PostDto(postModel.id, postModel.title, postModel.text, postModel.userId, postModel.createDate);
  } 
}

module.exports = PostService;