const PostController = require('../postController');
const PostService = require('../postService');
const PostDto = require('../postDto');
jest.mock('../postService');

describe('Post Controller', () => {
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

  it('should get all posts', async () => {
    const posts = [{ id: 'uuid1', title: 'title1', text: 'text1', userId: 'uuuid-user-1' }, { id: 'uuid2', title: 'title2', text: 'text2', userId: 'uuuid-user-2' }];
    PostService.prototype.getAllPosts.mockResolvedValue(posts);
    await PostController.getAllPosts(req, res);
    expect(res.json).toHaveBeenCalledWith(posts);
  });

  it('should get post by ID', async () => {
    const postId = 'uuid1';
    const post = { id: 'uuid1', title: 'title1', text: 'text1', userId: 'uuuid-user-1' };
    req.params = { id: postId };
    PostService.prototype.getPostById.mockResolvedValue(post);
    await PostController.getPostById(req, res);
    expect(res.json).toHaveBeenCalledWith(post);
  });

  it('should create a new post', async () => {
    const postData = new PostDto('uuid1', 'title1', 'text1', 'uuuid-user-1', null);
    const newPost = { id: null, ...postData };
    req.body = postData;
    PostService.prototype.createPost.mockResolvedValue(newPost);
    await PostController.createPost(req, res);
    expect(res.json).toHaveBeenCalledWith(newPost);
  });

  it('should update an existing post', async () => {
    const postId = "uuid-1234";
    const postData = new PostDto(postId, 'title1', 'text1', 'uuuid-user-1', null);
    req.params = { id: postId };
    req.body = postData;
    PostService.prototype.updatePost.mockResolvedValue(postData);
    await PostController.updatePost(req, res);
    expect(res.json).toHaveBeenCalledWith(postData);
  });

  it('should delete a post', async () => {
    const postId = "uuid-1234";
    req.params = { id: postId };
    PostService.prototype.deletePost.mockResolvedValue();
    await PostController.deletePost(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Object deleted' });
  });

});
