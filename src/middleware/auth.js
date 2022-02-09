const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => {
    res.status(200).json({ message: 'register a new user' });
});

router.post('/login', (req, res) => {
    res.status(200).json({ message: 'connect a user' });
});

module.exports = router;