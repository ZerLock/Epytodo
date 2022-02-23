const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = (res, email, name, firstname, password) => {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, password, name, firstname], (error, results, fields) => {
        if (error) {
            if (error.code == 'ER_DUP_ENTRY') res.status(401).json({ msg: 'account already exists' });
            else res.status(500).json({ msg: 'internal server error' });
            return;
        }
        const token = jwt.sign(
            { id: results.insertId },
            'EPYTODO_TOKEN_KEY',
            { expiresIn: '24h' }
        );
        res.status(201).json({ token: token });
    });
};

exports.login = (res, email, password) => {
    db.execute('SELECT * FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
        if (results.length != 1 || error) {
            res.status(401).json({ msg: 'Invalid Crendentials' });
            return;
        }
        console.log('db pwd: ' + results[0].password + '\npwd user: ' + password);
        bcrypt.compare(password, results[0].password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({ msg: 'Invalid Credentials' });
                    return;
                }
                const token = jwt.sign(
                    { id: results[0].id },
                    'EPYTODO_TOKEN_KEY',
                    { expiresIn: '24h' }
                );
                res.status(200).json({ token: token });
            })
            .catch(() => res.status(500).json({ msg: 'internal server error' }));
    });
};

exports.get_all_users = (res) => {
    db.execute('SELECT * FROM `user`', (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        res.status(200).json(results);
    });
};

exports.get_all_todo_by_user = (res, user_id) => {
    db.execute('SELECT * FROM `todo` WHERE `user_id` = ?', [user_id], (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ msg: 'internal server error' });
        }
        res.status(200).json( results );
    });
};

exports.get_user_by_id = (res, user_id) => {
    db.execute('SELECT * FROM `user` WHERE `id` = ?', [user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        if (results.length < 1)
            return res.status(404).json({ msg: 'Not found' });
        res.status(200).json( results[0] );
    });
};

exports.get_user_by_email = (res, email) => {
    db.execute('SELECT * FROM `user` WHERE `email` = ?', [email], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        if (results.length < 1)
            return res.status(404).json({ msg: 'Not found' });
        res.status(200).json( results[0] );
    });
};

exports.modify_user_by_id = (res, user_id, email, password, firstname, name) => {
    db.execute('UPDATE `user` SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?', [email, password, firstname, name, user_id], (error, results, fields) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        this.get_user_by_id(res, user_id);
    });
};

exports.delete_user_by_id = (res, user_id) => {
    db.execute('DELETE FROM `user` WHERE `id` = ?', [user_id], (error, results, id) => {
        if (error)
            return res.status(500).json({ msg: 'internal server error' });
        console.log(results);
        res.status(200).json({ msg: `successfully deleted record number: ${user_id}` });
    });
};