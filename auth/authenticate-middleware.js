const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  
  if (token) {
    jwt.verify(token, secret, (err, decodedUser) => {
      if (err) {
        res.status(400).json(err);
      } else {
        req.loggedInUser = decodedUser;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
}