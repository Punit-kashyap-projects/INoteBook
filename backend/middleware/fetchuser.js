const jwt = require("jsonwebtoken");
const JWT_SECRET = "punit";

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    res.status(401).send({ err: "Use a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;

    next();

  } catch (err) {
    res.status(401).send({ err: err.name, from: "fetchuser.js" });
  }
};

module.exports = fetchuser;
