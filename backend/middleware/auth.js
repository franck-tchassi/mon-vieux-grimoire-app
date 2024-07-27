const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Correctly split the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_BODY_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
};


