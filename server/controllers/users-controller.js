const User = require('../models/user-model')
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces()

//Create an user
const createUser = async (req, res) => {
  const { firstName, lastName, email, type, password } = req.body;
    let user = await User.findOne({ email });
    if (user) 
      return res.status(500).json("This email address is already being used.");
    if (!emailValidator.validate(email)) 
      return res.status(400).json("Please, enter a valid email address.");
    if (!passwordSchema.validate(req.body.password)) 
      return res.status(400).json(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 2 digits, and no spaces."
      );
    let data = { firstName, lastName, email, type, password };
    await User.create(data);
    return res.status(201).json('New user successfully created.')
};

//Request a list with all the registered users
const getUsersList = async (req, res) => {
  try {
    const usersList = await User.find();
    res.json(usersList)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

//Request an user information
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json("User not found.");
  return res.status(200).json(user);
};

//Update an user information
const updateUser = async (req, res) => {
  const { firstName, lastName, type, password } = req.body;
  const data = { firstName, lastName, type, password };
  const updatedData = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  if (!updatedData) return res.status(404).json("Id not found.")
  return res.status(200).json(updatedData);
};

//Delete an user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) return res.status(200).json('User deleted.');
    return res.status(404).json('Id not found.')
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

//Handle user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("No user registered with that email address.");
  const matchPasswords = await bcrypt.compare(password, user.password);
  if (matchPasswords) {
    const accessToken = jwt.sign({ name: user }, process.env.ACCESS_TOKEN_SECRET);
    // res.cookie("token", token, { httpOnly: true });
    return res.status(200).json(accessToken);
  } else return res.status(400).json("The password entered is incorrect.");
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorisation']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403)
    req.user = user
    next()
  })
}

module.exports = {
  createUser,
  getUsersList,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
};
