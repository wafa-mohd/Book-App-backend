const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Auth = require("../libs/auth");
const { body, validationResult } = require("express-validator");

const saltRounds = 10;

router.get("/", (req, res) => {
  console.log("hello");
  res.json("hello world");
});

router.post(
  "/sign-up",
  body("firstName").exists().withMessage("first name is required"),
  body("lastName").exists().withMessage("last name is required"),
  body("email").exists().withMessage("email is required"),
  // body('password').exists().withMessage("password is required").isLength({ min: 6, max:32 }).withMessage("Passowrd must be 6 to 32"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //custom validation:
    if (!req.body.password) {
      return res.status(400).json({ errors: "Password is required!" });
    } else if (req.body.password.length < 6 || req.body.password.length > 32) {
      return res.status(400).json({ errors: "Password must be 6 to 32" });
    }

    // let { firstName, lastName, email, password } = req.body;

    let oldUser = await User.findOne({
      email: req.body.email,
    });
    if (!oldUser) {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        })
          .then(() => {
            res.json({message: "Registered Successfully"});
          })
          .catch((err) => {
            console.log("error", err);
          });
      });
    } else {
      res.status(400).json({
        message: "You have been already registered",
      });
    }
  }
);

router.post("/login", (req, res) => {
  body("email").exists().withMessage("password is required"),
  body('password').exists().withMessage("password is required")
  let { email, password } = req.body;
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      console.log("password ", user.password);
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY
          );
          res.json({message:"login completed", token});
        } else res.status(401).json("invalid credentials");
      });
    } else {
      res.status(401).json("User not found");
    }
  });
});

router.get("/profile", Auth.isAuthorized, (req, res) => {
  console.log("token", req.headers.authorization);
  res.json({ message: "hi user!", user: req.user });
});

module.exports = router;
