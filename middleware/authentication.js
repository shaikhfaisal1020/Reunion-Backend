const jwt = require("jsonwebtoken");

// Middleware to check if the request has a valid token and if the user is an owner
const authenticateOwner = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.userId = user.userId;
    next();
  });
};

module.exports = { authenticateOwner };
