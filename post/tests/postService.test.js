const PostService = require('../postService');
const PostRepository = require('../postRepository');
const PostDto = require('../postDto');

jest.mock('../postRepository');

describe('Post Service', () => {
  let postService;

  beforeEach(() => {
    postService = new PostService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all posts', async () => {
    const posts = [{ id: 'uuid1', title: 'title1', text: 'text1', userId: 'uuuid-user-1' }, { id: 'uuid2', title: 'title2', text: 'text2', userId: 'uuuid-user-2' }];
    PostRepository.prototype.findAll.mockResolvedValue(posts);
    const result = await postService.getAllPosts();
    expect(result).toEqual(posts);
  });

  it('should get post by ID', async () => {
    const postId = 'uuid1';
    const post = { id: 'uuid1', title: 'title1', text: 'text1', userId: 'uuuid-user-1' };
    PostRepository.prototype.findById.mockResolvedValue(post);
    const result = await postService.getPostById(postId);
    expect(result).toEqual(post);
  });

  it('should create a new post', async () => {
    const postData = new PostDto('uuid1', 'title1', 'text1', 'uuuid-user-1', null);
    const newPost = { id: 'uuid1', ...postData };
    PostRepository.prototype.create.mockResolvedValue(newPost);
    const result = await postService.createPost(postData);
    expect(result).toEqual(newPost);
  });

  it('should update an existing post', async () => {
    const postId = 'uuid1';
    const updatedPostData = new PostDto(postId, 'title2', 'text2', 'uuuid-user-2', null);
    const updatedPost = { id: postId, ...updatedPostData };
    PostRepository.prototype.update.mockResolvedValue(updatedPost);
    const result = await postService.updatePost(updatedPostData);
    expect(result).toEqual(updatedPost);
  });

  it('should delete a post by ID', async () => {
      const postId = 'uuid1';
      PostRepository.prototype.delete.mockResolvedValue(true);
      const result = await postService.deletePost(postId);
      expect(result).toBe(true);
  });
  
});