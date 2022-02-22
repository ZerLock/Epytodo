const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'EPYTODO_TOKEN_KEY', (error, id) => {
            if (error) {
                res.status(401).json({ msg: 'Token is not valid' });
                return;
            }
            if (req.body.id && req.body.id !== id) {
                throw 'Invalid Credentials';
            } else {
                next();
            }
        });
    } catch (error) {
        res.status(401).json({ msg: 'No token, authorization denied' });
    }
};