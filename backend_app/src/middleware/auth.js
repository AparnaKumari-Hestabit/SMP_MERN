const secretKey = process.env.JWT_SECRET || 'aparna_kumari';
import jwt from "jsonwebtoken";

const activeTokens = new Map(); // Store active tokens (Use Redis for production)

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use `jwt.verify`
        req.user = decoded; // Attach decoded user to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export default { authenticateToken, activeTokens };