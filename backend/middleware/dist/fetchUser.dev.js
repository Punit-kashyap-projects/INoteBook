"use strict";

var jwt = require("jsonwebtoken");

var JWT_SECRET = "punit";

var fetchuser = function fetchuser(req, res, next) {
  // get the user from the jwt token and add id
  var token = req.header("auth-token");
  console.log(token);

  if (!token) {
    console.log('not valid');
    res.status(401).send({
      err: "Use a valid token"
    });
  }

  try {
    var data = jwt.verifY(token, JWT_SECRET);
    console.log(data);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({
      err: err.name,
      from: 'fetchuser.js'
    });
  }
};

module.exports = fetchuser;