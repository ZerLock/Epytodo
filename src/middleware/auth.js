const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.EPYTODO_SECRET, (error, id) => {
            if (error)
                return res.status(401).json({ msg: 'Token is not valid' });
            if (req.body.id && req.body.id !== id)
                throw 'Invalid Credentials';
            else {
                req.userID = id;
                next();
            }
        });
    } catch (error) {
        res.status(401).json({ msg: 'No token, authorization denied' });
    }
};