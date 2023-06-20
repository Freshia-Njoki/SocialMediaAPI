import { getPosts, getPost, deletePost, updatePost, addPost } from '../Controllers/postController.js'


const postRoutes = (app) => {
    app.route('/Posts')
        .get(getPosts)
        .post(addPost);

    app.route('/Post/:post_id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

  
};

export default postRoutes;
