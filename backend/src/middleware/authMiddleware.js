const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    console.log('token', token)
    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERR'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token11',
                status: 'ERR'
            });
        }

        if (user?.role == "Admin" || user?.role == "Retailer") {
            next()
        } else {
            return res.status(403).json({
                message: 'Unauthorized access',
                status: 'ERR'
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERR'
        });
    }


    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({
                message: 'Invalid token',
                status: 'ERR'
            });
        }

        if (user?.role == "Admin" || user?.role == "Retailer" || user?.id === userId) {
            next();
        } else {
            return res.status(403).json({
                message: 'Unauthorized access',
                status: 'ERR'
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};
