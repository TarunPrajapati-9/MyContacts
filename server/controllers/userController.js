const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./sendMail");

//Register a User
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered!");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: " + hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  // console.log(`User created ${user}`);
  if (user) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );

    //mail
    const messageId = await sendEmail(email, username, "register");
    if (!messageId) {
      throw new Error("Email Not Sent!");
    }

    res
      .status(201)
      .json({ _id: user.id, email: user.email, accesstoken, messageId });
  } else {
    res.status(400);
    throw new Error("User Not Created");
  }
});

//Login a User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are required!");
  }

  const user = await User.findOne({ email });

  //compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );

    //mail
    const messageId = await sendEmail(email, user.username, "login");
    if (!messageId) {
      throw new Error("Email Not Sent!");
    }

    res.status(200).json({ accesstoken, messageId });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//Get Information of current a User
const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl,
  });
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // console.log(user._id + " && " + req.user.id);
  if (user._id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission");
  }

  if (!req.body.imageUrl) {
    res.status(404);
    throw new Error("Image not found");
  }

  user.imageUrl = req.body.imageUrl || user.imageUrl;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});
module.exports = { registerUser, loginUser, currentUser, updateUser };
