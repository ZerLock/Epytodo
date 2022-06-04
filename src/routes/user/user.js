const express = require('express');
const { check_user_id } = require('../../middleware/notFound');
const regex = require('../../config/regex');
const {
    getAllTodoByUser,
    getUserById,
    getUserByEmail,
    modifyUserById,
    deleteUserById
} = require('./user.query');
const userRouter = express.Router();
const usersRouter = express.Router();

userRouter.get('/', (req, res) => {
    getUserById(res, req.userID.id);
});

userRouter.get('/todos', (req, res) => {
    getAllTodoByUser(res, req.userID.id);
});

usersRouter.param('id', (req, res, next, id) => {
    if (isNaN(id))
        next('route');
    else
        next();
});

usersRouter.param('email', (req, res, next, id) => {
    if (id.match(regex))
        next();
    else
        next('route');
})

usersRouter.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!id)
        return res.status(400).json({ msg: 'Invalid Credentials' });
    getUserById(res, id);
});

usersRouter.get('/:email', (req, res) => {
    var email = req.params.email;

    if (!email)
        return res.status(400).json({ msg: 'Invalid Credentials' });
    getUserByEmail(res, email);
});

usersRouter.put('/:id', check_user_id, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var name = req.body.name;
    var id = req.params.id;

    if (!id || !email || !password || !firstname || !name || !email.match(regex))
        return res.status(401).json({ msg: 'Invalid Credentials' });
    modifyUserById(res, id, email, password, firstname, name);
});

usersRouter.delete('/:id', check_user_id, (req, res) => {
    var id = req.params.id;

    if (!id)
        return res.status(400).json({ msg: 'Invalid Credentials' });
    deleteUserById(res, req.params.id);
});

module.exports = { userRouter, usersRouter };