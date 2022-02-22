const db = require('../config/db');

module.exports = (req, res, next) => {
    todo_id = req.params.id;

    if (todo_id) {
        db.execute('SELECT * FROM `todo` WHERE `id` = ?', [todo_id], (error, results, fields) => {
            if (results.length > 0)
                next();
            else
                res.status(404).json({ msg: 'Not found' });
        });
    } else {
        res.status(500).json({ msg: 'internal server error' });
    }
}