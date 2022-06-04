const express = require('express');
const bcrypt = require('bcrypt');
const regex = require('../../config/regex');
const { register, login } = require('../user/user.query');
const router = express.Router();

router.post('/register', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var firstname = req.body.firstname;
    var password = req.body.password;

    if (!email || !name || !firstname || !password || !email.match(regex))
        return res.status(400).json({ msg: 'Bad parameter' });
    register(res, email, name, firstname, password);
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password)
        return res.status(400).json({ msg: 'Invalid Credentials' });
    login(res, email, password);
});

module.exports = router;