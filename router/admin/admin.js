const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");
const Auth = require("../../libs/auth")

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  Admin.findOne({
    email: email,
  }).then((admin) => {
    if (admin) {
      console.log("password ", admin.password);
      bcrypt.compare(password, admin.password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            { adminId: admin._id },
            process.env.ADMIN_SECRET_KEY
          );
          res.json({ message: "login completed", token });
        } else res.status(401).json({message:"invalid credentials"});
      });
    } else {
      res.status(401).json("Admin not found");
    }
  });
});

router.get("/", Auth.isAdminAuthorized, (req, res) => {
    console.log("token", req.headers.authorization);
    res.json({ message: "hi admin!", admin: req.admin });
});

module.exports = router;
