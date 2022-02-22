const db = require('../../config/db');

exports.get_all_todos = (res) => {
    db.execute('SELECT * FROM `todo`', (error, results, fields) => {
        res.status(200).json( results );
    });
};

exports.get_todo_by_id = (res, todo_id) => {
    db.execute('SELECT * FROM `todo` WHERE `id` = ?', [todo_id], (error, results, fields) => {
        if (error)
             return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json({ results });
    });
};

exports.add_new_todo = (res, title, desc, due_time, user_id, status) => {
    db.execute('INSERT INTO `todo` (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [title, desc, due_time, status, user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        this.get_todo_by_id(res, results.insertId);
    });
};

exports.modify_toto_by_id = (res, todo_id, title, desc, due_time, user_id, status) => {
    db.execute('UPDATE `todo` SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?', [title, desc, due_time, status, user_id, todo_id], (err, result, f) => {
        if (err)
            return res.status(500).json({ msg: 'internal server error' });
        db.execute('SELECT title, description, due_time, user_id, status FROM `todo` WHERE `id` = ?', [todo_id], (error, results, fields) => {
            if (error)
                return res.status(500).json({ msg: 'internal server error' });
            res.status(200).json( results[0] );
        });
    });
};

exports.delete_todo_by_id = (res, todo_id) => {
    db.execute('DELETE FROM `todo` WHERE id = ?', [todo_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json({ msg: `successfully deleted record number: ${todo_id}` });
    });
};