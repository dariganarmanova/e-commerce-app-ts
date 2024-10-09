const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        jwt.verify(token, 'nvdsvnjekna', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user; // Attach user payload (e.g., userId, email) to req
            next();
        });
    } else {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
};

module.exports = verifyToken