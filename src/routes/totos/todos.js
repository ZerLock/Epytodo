const express = require('express');
const router = express.Router();
const { get_all_todos, get_todo_by_id, add_new_todo, modify_toto_by_id, delete_todo_by_id } = require('./todos.query');
const { check_id } = require('../../middleware/notFound');

router.get('/', (req, res, next) => {
    get_all_todos(res);
});

router.get('/:id', check_id, (req, res, next) => {
    get_todo_by_id(res, req.params.id);
})

router.post('/', (req, res, next) => {
    var title = req.body.title;
    var desc = req.body.description;
    var due_time = req.body.due_time;
    var user_id = req.body.user_id;
    var status = req.body.status;

    if (title === undefined || desc === undefined || due_time === undefined || user_id === undefined || status === undefined)
        return res.status(401).json({ msg: 'Invalid Credentials' });
    add_new_todo(res, title, desc, due_time, user_id, status);
});

router.put('/:id', check_id, (req, res, next) => {
    var title = req.body.title;
    var desc = req.body.description;
    var due_time = req.body.due_time;
    var user_id = req.body.user_id;
    var status = req.body.status;

    if (title === undefined || desc === undefined || due_time === undefined || user_id === undefined || status === undefined)
        return res.status(401).json({ msg: 'Invalid Credentials' });
    modify_toto_by_id(res, req.params.id, title, desc, due_time, user_id, status);
});

router.delete('/:id', check_id, (req, res) => {
    delete_todo_by_id(res, req.params.id);
});

module.exports = router;