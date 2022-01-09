const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "punit";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Create a user using POST "/api/auth/createUser" does not require authentication
router.post(
  "/createUser",
  [
    body("name", "Your name atleast be of 5 characters").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are error return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ err: "User already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,  
        });

        const data = {
          user: {
            id: user.id,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken, user });
      }
    } catch (err) {
      res.status(500).json({ err: err.name });
      console.log(err.message);
    }

    // .then(user => res.json(user))
    // .catch(err => res.json({err: 'Email already exists', name:err.name}));
  }
);

// Login user using POST "/api/auth/login" does not require authentication
router.post(
  "/login",

  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter the password").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    // if there are error return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ err: "Use correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ err: "Use correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log({authtoken});

      res.json({ authtoken });
    } catch (err) {
      res.status(400).json({ err: err.name });
    }
  }
);

// Route 3: get ligin use details endPoint: "/getUser"

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (err) {
    res.status(500).send({ err: err.name });
  }
});

module.exports = router;
