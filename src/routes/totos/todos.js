const express = require('express');
const { route } = require('../auth/auth');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'view all the todos' });
    next();
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({ message: 'view the todo' });
    next();
})

router.post('/', (req, res, next) => {
    res.status(200).json({ message: 'create a todo' });
    next();
});

router.put('/:id', (req, res, next) => {
    res.status(200).json({ message: 'update a todo' });
    next();
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'delete a todo' });
});

module.exports = router;