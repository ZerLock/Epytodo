const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'view all uer informations' });
    next();
});

router.get('/todos', (req, res, next) => {
    res.status(200).json({ message: 'view all user tasks' });
    next();
});

router.get('/:data', (req, res, next) => {
    res.status(200).json({ message: 'view data' });
    next();
});

router.put('/:id', (req, res, next) => {
    res.status(200).json({ message: 'update user information' });
    next();
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'delete user' });
});

module.exports = router;