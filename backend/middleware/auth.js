const jwt = require("jsonwebtoken");

<<<<<<< HEAD
module.exports = (req, res, next) => {
  try {
    // Correctly split the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
};
=======

module.exports = (req, res, next) =>{
    try{
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
        userId: userId
       }
       next()
    }
    catch(error){
        res.status(401).json({error});
    }
}
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
