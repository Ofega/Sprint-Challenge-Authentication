const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model');

router.post('/register', validateCredentials, (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 11);

  db.addUser({ username, password: hash })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', validateCredentials, (req, res) => {
  const { username, password } = req.body;

  db.getUser({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(() => {
      res.status(401).json({ message: "No user found" });
    });
});


//Middleware
function validateCredentials(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password || !department) {
    res.status(401).json({ message: "username and password required" });
  } else {
    next();
  }
}

function generateToken(user) {
  return jwt.sign(
    {
      subject: user.id,
      username: user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
}

module.exports = router;
