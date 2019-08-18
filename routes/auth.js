const router =require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Checking if the user is new
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();

    //Create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token});
  } catch (e) {
    res.status(400).send(e);
  }
});

//Login
router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Checking if the user is new
  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send('Email is not found');

  //Password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  //Create token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({token});
});

module.exports = router;
