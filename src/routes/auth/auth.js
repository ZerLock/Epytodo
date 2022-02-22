const express = require('express');
const bcrypt = require('bcrypt');
const { register, login } = require('../user/user.query');
const router = express.Router();

router.post('/register', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var firstname = req.body.firstname;
    var password = req.body.password;

    if (email === undefined || name === undefined || firstname === undefined || password === undefined) {
        res.status(500).json({ msg: 'internal server error' });
        return;
    }
    bcrypt.hash(password, 10)
        .then(hash => {
            register(res, email, name, firstname, hash);
        })
        .catch(() => res.status(500).json({ msg: 'internal server error' }));
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email === undefined || password === undefined) {
        res.status(500).json({ msg: 'internal server error' });
        return;
    }
    login(res, email, password);
});

module.exports = router;