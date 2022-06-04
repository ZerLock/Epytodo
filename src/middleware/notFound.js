const db = require('../config/db');

exports.check_id = (req, res, next) => {
    todo_id = req.params.id;

    if (todo_id) {
        db.execute('SELECT * FROM `todo` WHERE `id` = ?', [todo_id], (error, results, fields) => {
            if (results.length > 0)
                next();
            else
                res.status(404).json({ msg: 'Not found' });
        });
    } else
        res.status(500).json({ msg: 'Intenal server error' });
}

exports.check_user_id = (req, res, next) => {
    user_id = req.params.id;

    if (user_id) {
        db.execute('SELECT * FROM `user` WHERE `id` = ?', [user_id], (error, results, fields) => {
            if (results.length > 0)
                next();
            else
                res.status(404).json({ msg: 'Not found' });
        });
    } else
        res.status(500).json({ msg: 'Intenal server error' });
}