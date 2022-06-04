const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (res, email, name, firstname, password) => {
    bcrypt.hash(password, 10)
    .then(hash => {
        db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, hash, name, firstname], (error, results, fields) => {
            if (error) {
                if (error.code == 'ER_DUP_ENTRY')
                    res.status(400).json({ msg: 'Account already exists' });
                else
                    res.status(500).json({ msg: 'Intenal server error' });
                return;
            }
            const token = jwt.sign(
                { id: results.insertId },
                process.env.EPYTODO_SECRET,
                { expiresIn: '24h' }
            );
            res.status(201).json({ token: token });
        });
    })
    .catch(() => res.status(500).json({ msg: 'Internal server error' }));
};

exports.login = (res, email, password) => {
    db.execute('SELECT * FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
        if (results.length != 1 || error)
            return res.status(401).json({ msg: 'Invalid Crendentials' });
        bcrypt.compare(password, results[0].password)
            .then(valid => {
                if (!valid)
                    return res.status(401).json({ msg: 'Invalid Credentials' });
                const token = jwt.sign(
                    { id: results[0].id },
                    process.env.EPYTODO_SECRET,
                    { expiresIn: '24h' }
                );
                res.status(200).json({ token: token });
            })
            .catch(() => res.status(500).json({ msg: 'Intenal server error' }));
    });
};

exports.getAllUsers = (res) => {
    db.execute('SELECT CAST(`id` AS VARCHAR(10)) AS `id`, `email`, `password`, DATE_FORMAT(`created_at`, "%Y-%m-%d %H:%i:%S") AS `created_at`, `firstname`, `name` FROM `user`', (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        res.status(200).json(results);
    });
};

exports.getAllTodoByUser = (res, user_id) => {
    db.execute('SELECT CAST(`id` AS VARCHAR(10)) AS `id`, `title`, `description`, DATE_FORMAT(`created_at`, "%Y-%m-%d %H:%i:%S") AS `created_at`, DATE_FORMAT(`due_time`, "%Y-%m-%d %H:%i:%S") AS `due_time`, CAST(`user_id` AS VARCHAR(10)) AS `user_id`, `status` FROM `todo` WHERE `user_id` = ?', [user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        res.status(200).json( results );
    });
};

exports.getUserById = (res, user_id) => {
    db.execute('SELECT CAST(`id` AS VARCHAR(10)) AS `id`, `email`, `password`, DATE_FORMAT(`created_at`, "%Y-%m-%d %H:%i:%S") AS `created_at`, `firstname`, `name` FROM `user` WHERE `id` = ?', [user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        if (results.length < 1)
            return res.status(404).json({ msg: 'Not found' });
        res.status(200).json( results[0] );
    });
};

exports.getUserByEmail = (res, email) => {
    db.execute('SELECT CAST(`id` AS VARCHAR(10)) AS `id`, `email`, `password`, DATE_FORMAT(`created_at`, "%Y-%m-%d %H:%i:%S") AS `created_at`, `firstname`, `name` FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        if (results.length < 1)
            return res.status(404).json({ msg: 'Not found' });
        res.status(200).json( results[0] );
    });
};

exports.modifyUserById = (res, user_id, email, password, firstname, name) => {
    db.execute('UPDATE `user` SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?', [email, password, firstname, name, user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        this.getUserById(res, user_id);
    });
};

exports.deleteUserById = (res, user_id) => {
    db.execute('DELETE FROM `user` WHERE `id` = ?', [user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'Intenal server error' });
        res.status(200).json({ msg: `Successfully deleted record number: ${user_id}` });
    });
};