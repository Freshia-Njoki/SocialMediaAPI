import { getComments, getComment, deleteComment, updateComment, addComment } from '../Controllers/commentsController.js'

const commentRoutes = (app) => {
    app.route('/Comments')
        .get(getComments)
        .post(addComment);

    app.route('/Comment/:comment_id')
    .get(getComment)
    .put(updateComment)
    .delete(deleteComment);

}
export default commentRoutes;