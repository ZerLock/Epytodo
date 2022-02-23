const express = require('express');
const { check_user_id } = require('../../middleware/notFound');
const { get_all_users, get_all_todo_by_user, get_user_by_id, get_user_by_email, modify_user_by_id, delete_user_by_id } = require('./user.query');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    get_all_users(res);
});

router.get('/todos', (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'EPYTODO_TOKEN_KEY', (error, id) => get_all_todo_by_user(res, id.id) );
    } catch (error) {
        res.status(401).json({ msg: 'No token, authorization denied' });
    }
});

router.get('/:data', (req, res, next) => {
    var data = req.params.data;

    if (data == undefined)
        return res.status(401).json({ msg: 'Invalid Credentials' });

    if (!isNaN(data)) {
        console.log('number');
        get_user_by_id(res, data);
    } else {
        console.log('email');
        get_user_by_email(res, data);
    }
});

router.put('/:id', check_user_id, (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var name = req.body.name;
    var id = req.params.id;

    console.log('email', email);
    console.log('password', password);
    console.log('firstname', firstname);
    console.log('name', name);
    console.log('id', id);
    if (id == undefined || email == undefined || password == undefined || firstname == undefined || name == undefined)
        return res.status(401).json({ msg: 'Invalid Credentials' });
    modify_user_by_id(res, id, email, password, firstname, name);
});

router.delete('/:id', check_user_id, (req, res) => {
    delete_user_by_id(res, req.params.id);
});

module.exports = router;