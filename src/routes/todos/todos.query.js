const db = require('../../config/db');

exports.getAllTodos = (res) => {
    db.execute('SELECT CAST(`id` AS VARCHAR(10)) AS `id`, `title`, `description`, DATE_FORMAT(`created_at`, "%Y-%m-%d %H:%i:%S") AS `created_at`, DATE_FORMAT(`due_time`, "%Y-%m-%d %H:%i:%S") AS `due_time`, CAST(`user_id` AS VARCHAR(10)) AS `user_id`, `status` FROM `todo`', (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Internal server error' });
        if (!results)
            results = [];
        res.status(200).json( results );
    });
};

exports.getTodoById = (res, todo_id) => {
    db.execute('SELECT CAST(`id` AS VARCHAR(10)) AS `id`, `title`, `description`, DATE_FORMAT(`created_at`, "%Y-%m-%d %H:%i:%S") AS `created_at`, DATE_FORMAT(`due_time`, "%Y-%m-%d %H:%i:%S") AS `due_time`, CAST(`user_id` AS VARCHAR(10)) AS `user_id`, `status` FROM `todo` WHERE `id` = ?', [todo_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Internal server error' });
        res.status(200).json( results[0] );
    });
};

exports.addNewTodo = (res, title, desc, due_time, user_id, status) => {
    db.execute('INSERT INTO `todo` (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [title, desc, due_time, status, user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        db.execute('SELECT `title`, `description`, DATE_FORMAT(`due_time`, "%Y-%m-%d %H:%i:%S") AS `due_time`, CAST(`user_id` AS VARCHAR(10)) AS `user_id`, `status` FROM `todo` WHERE `id` = ?', [results.insertId], (err, re, f) => {
            if (err)
                return res.status(500).json({ msg: 'Internal server error' });
            res.status(201).json(re[0]);
        });
    });
};

exports.modifyTodoById = (res, todo_id, title, desc, due_time, user_id, status) => {
    db.execute('UPDATE `todo` SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?', [title, desc, due_time, status, user_id, todo_id], (err, result, f) => {
        if (err)
            return res.status(500).json({ msg: 'Intenal server error' });
        db.execute('SELECT title, description, DATE_FORMAT(`due_time`, "%Y-%m-%d %H:%i:%S") AS `due_time`, CAST(`user_id` AS VARCHAR(10)) AS `user_id`, status FROM `todo` WHERE `id` = ?', [todo_id], (error, results, fields) => {
            if (error)
                return res.status(500).json({ msg: 'Intenal server error' });
            res.status(200).json( results[0] );
        });
    });
};

exports.deleteTodoById = (res, todo_id) => {
    db.execute('DELETE FROM `todo` WHERE id = ?', [todo_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        res.status(200).json({ msg: `Successfully deleted record number: ${todo_id}` });
    });
};