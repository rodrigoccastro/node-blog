const PostService = require('./postService');
const PostDto = require('./postDto');
const postService = new PostService();
const Controller = require('./controller'); 

async function getAllPosts(req, res) {
    try {
        const posts = await postService.getAllPosts();
        Controller.responseList(res, posts);
    } catch (err) {
        return Controller.responseMessage(res, Controller.getStatusError(), err.message);
    }
}

async function getPostById(req, res) {
    try {
        const id = Controller.getId(req);
        const user = await postService.getPostById(id);
        if (!user) {
            return Controller.responseMessage(res, Controller.getStatusNotFound(), Controller.getTextMessagePostNotFound());
        }
        Controller.responseObject(res, user);
    } catch (err) {
        Controller.responseMessage(res, Controller.getStatusError(), err.message);
    }
}

async function createPost(req, res) {
    try {
        await validatePostInput(req);
        const { title, text, userId } = req.body;
        const postDto = new PostDto(null, title, text, userId, null);
        const newPost = await postService.createPost(postDto);
        res.status(Controller.getStatusSuccess()).json(newPost);
    } catch (err) {
        Controller.responseMessage(res, Controller.getStatusError(), err.message);
    }
}

async function updatePost(req, res) {
  try {
    const id = Controller.getId(req);
    await validatePostInput(req);
    const { title, text, userId } = req.body;
    const postDto = new PostDto(id, title, text, userId, null);
    const updatedPost = await postService.updatePost(postDto);
    Controller.responseObject(res, updatedPost)
  } catch (err) {
    Controller.responseMessage(res, Controller.getStatusError(), err.message) 
  }
}

async function deletePost(req, res) {
  try {
    const id = Controller.getId(req);
    await postService.deletePost(id);
    Controller.responseMessage(res, Controller.getStatusSuccess(), Controller.getTextMessageDeleted()) 
  } catch (err) {
    Controller.responseMessage(res, Controller.getStatusError(), err.message) 
  }
}

async function validatePostInput(req) {
  const { title, text, userId } = req.body;
  if (!title|| !text|| !userId) {
    throw new Error(Controller.getTextMessageBodySaveNotFound());
  }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};