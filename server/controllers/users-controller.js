const User = require('../models/user-model');
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

require('dotenv').config(); // Ensure environment variables are loaded

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(2)
  .has().not().spaces();

// Create a user
const createUser = async (req, res) => {
  const { firstName, lastName, email, type, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(500).json("This email address is already being used. Try to login instead.");
  if (!emailValidator.validate(email))
    return res.status(400).json("Please, enter a valid email address.");
  if (!passwordSchema.validate(req.body.password))
    return res.status(400).json(
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 2 digits, and no spaces."
    );
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
  let data = { firstName, lastName, email, type, password: hashedPassword };
  await User.create(data);
  console.log(data);
  return res.status(201).json('New user successfully created.');
};

// Request a list with all the registered users
const getUsersList = async (req, res) => {
  try {
    const usersList = await User.find();
    res.json(usersList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request a user's information
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json("User not found.");
  return res.status(200).json(user);
};

// Update a user's information
const updateUser = async (req, res) => {
  const { firstName, lastName, type, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before updating
  const data = { firstName, lastName, type, password: hashedPassword };
  const updatedData = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  if (!updatedData) return res.status(404).json("Id not found.");
  return res.status(200).json(updatedData);
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) return res.status(200).json('User deleted.');
    return res.status(404).json('Id not found.');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate Access and Refresh Tokens
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Handle user login
const userLogin = async (req, res) => {
  console.log('userLogin function hit');
  console.log(req.body);
  console.log(res.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) return res.status(401).json("The email or password entered are incorrect.");

  const matchPasswords = await bcrypt.compare(password, user.password);
  if (matchPasswords) {
    console.log(matchPasswords);
    const payload = {
      id: user._id,
      email: user.email,
      first_name: user.firstName,
      type: user.type,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    
    // Save the refresh token with the user
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ auth: true, accessToken, payload });
  } else {
    return res.status(401).json("The email or password entered are incorrect.");
  }
};


// Refresh access token
const refreshUserToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundUser = await User.findOne({ email: decoded.email });

      if (!foundUser || foundUser.refreshToken !== refreshToken) return res.status(401).json({ message: 'Unauthorized' });

      const payload = {
        id: foundUser._id,
        email: foundUser.email,
        first_name: foundUser.firstName,
        type: foundUser.type,
      };
      const accessToken = generateAccessToken(payload);

      res.json({ accessToken });
    }
  );
};

// Logout user
const userLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  createUser,
  getUsersList,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  refreshUserToken,
  userLogout,
};
