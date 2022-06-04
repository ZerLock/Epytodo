const express = require('express');
const router = express.Router();
const {
    getAllTodos,
    getTodoById,
    addNewTodo,
    modifyTodoById,
    deleteTodoById
} = require('./todos.query');
const { check_id } = require('../../middleware/notFound');

router.get('/', (req, res) => {
    getAllTodos(res);
});

router.get('/:id', check_id, (req, res) => {
    getTodoById(res, req.params.id);
});

router.post('/', (req, res) => {
    var title = req.body.title;
    var desc = req.body.description;
    var due_time = req.body.due_time;
    var user_id = req.body.user_id;
    var status = req.body.status;

    if (!title || !desc || !due_time || !user_id || !status)
        return res.status(401).json({ msg: 'Invalid Credentials' });
    addNewTodo(res, title, desc, due_time, user_id, status);
});

router.put('/:id', check_id, (req, res) => {
    var title = req.body.title;
    var desc = req.body.description;
    var due_time = req.body.due_time;
    var user_id = req.body.user_id;
    var status = req.body.status;

    if (!title || !desc || !due_time || !user_id || !status)
        return res.status(401).json({ msg: 'Invalid Credentials' });
    modifyTodoById(res, req.params.id, title, desc, due_time, user_id, status);
});

router.delete('/:id', check_id, (req, res) => {
    deleteTodoById(res, req.params.id);
});

module.exports = router;