const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customer = require("../db/customers");

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loginUser = customer.getCustomerByEmail(email, (user) => {
    if (user.length > 0) {
      const hashpwd = user[0].password;
      const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);

      if (bcrypt.compareSync(password, hashpwd)) {
        res.send({ token });
      } else {
        res.sendStatus(400).end();
      }
    }
  });
};

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.sendStatus(400).end();
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.sendStatus(400).end();
      } else {
        next();
      }
    });
  }
};

module.exports = {
  login: login,
  authenticate: authenticate,
};
