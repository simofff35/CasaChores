const express = require("express");
const router = express.Router();
const userSchema = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/", async (req, res) => {
  const { email, password, remember } = req.body;

  let foundUser = await userSchema.findOne({ email: email });
  let expiredTime;

  if (foundUser) {
    const passwordCheck = await bcrypt.compare(password, foundUser.password);
    if (passwordCheck) {
      remember
        ? (expiredTime = 1000 * 60 * 60 * 24) // 24 hours
        : (expiredTime = 1000 * 60 * 60); // 1 hour

      const token = jwt.sign({ id: foundUser._id }, process.env.KEY, {
        expiresIn: expiredTime,
      });

      res.cookie("rem", token, {
        expires: new Date(Date.now() + expiredTime),
        httpOnly: true,
      });

      req.session.userId = foundUser._id;

      res.status(200).json({ message: "Logged in" });
    } else {
      res.status(400).json({
        message: "Invalid email or password",
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
});

module.exports = router;
