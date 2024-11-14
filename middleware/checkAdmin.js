// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
    // Assuming req.user is populated after token verification
    if (req.user && req.user.role === 'admin') {
        // User is an admin, proceed to the next middleware
        next();
    } else {
        // User is not an admin, return forbidden response
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = checkAdmin;
