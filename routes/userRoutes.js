import { getUsers, getUser, createUsers, updateUser, deleteUser } from '../Controllers/userController.js'
import { login, register, loginRequired } from '../Controllers/auntController.js';

const userRoutes = (app) => {
    app.route('/Users')
        .get(loginRequired, getUsers) 
        .post(loginRequired, createUsers);

    app.route('/User/:user_id')
        .get(loginRequired, getUser)
        .put(loginRequired, updateUser)
        .delete(loginRequired, deleteUser);

        //authentication routes
    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);

};



export default userRoutes;