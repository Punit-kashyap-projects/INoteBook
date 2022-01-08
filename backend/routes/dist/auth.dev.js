"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/User");

var bcrypt = require("bcryptjs");

var JWT_SECRET = "punit";

var jwt = require("jsonwebtoken");

var _require = require("express-validator"),
    body = _require.body,
    validationResult = _require.validationResult; // Create a user using POST "/api/auth/createUser" does not require authentication


router.post("/createUser", [body("name", "Your name atleast be of 5 characters").isLength({
  min: 5
}), body("email", "Enter a valid email").isEmail(), body("password", "Password must be atleast 5 characters long").isLength({
  min: 5
})], function _callee(req, res) {
  var errors, user, salt, secPass, data, authtoken;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req); // if there are error return bad request

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 6:
          user = _context.sent;

          if (!user) {
            _context.next = 11;
            break;
          }

          res.status(400).json({
            err: "User already exists"
          });
          _context.next = 23;
          break;

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 16:
          secPass = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
          }));

        case 19:
          user = _context.sent;
          data = {
            user: {
              id: user.id
            }
          }; // console.log(user);

          authtoken = jwt.sign(data, JWT_SECRET); // console.log({authtoken});

          res.json({
            authtoken: authtoken,
            user: user
          });

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](3);
          res.status(500).json({
            err: _context.t0.name
          });
          console.log(_context.t0.message);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 25]]);
}); // Login user using POST "/api/auth/login" does not require authentication

router.post("/login", [body("email", "Enter a valid email").isEmail(), body("password", "Enter the password").exists()], function _callee2(req, res) {
  var errors, _req$body, email, password, user, passwordCompare, data, authtoken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req); // if there are error return bad request

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            err: "Use correct credentials"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 12:
          passwordCompare = _context2.sent;

          if (passwordCompare) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            err: "Use correct credentials"
          }));

        case 15:
          data = {
            user: {
              id: user.id
            }
          };
          authtoken = jwt.sign(data, JWT_SECRET); // console.log({authtoken});

          res.json({
            authtoken: authtoken,
            user: user
          });
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](4);
          res.status(400).json({
            err: _context2.t0.name
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 20]]);
});
module.exports = router;