const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const header = req.headers.token;
  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).send("Invalid Token");
      }
      req.user = user;
      next();
    });
    console.log(token)
  } else {
    return res.status(401).send("Authentication Failed");
  }
};

const authorisation = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Restricted!");
    }
  });
};

const authorisationAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Restricted!");
    }
  });
};

module.exports = { verify, authorisation, authorisationAdmin };
