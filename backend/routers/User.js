const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const Quote = require('../models/Quote');
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth');

router.post('/register', async(req,res) => {
  const doesExist = await User.findOne({username: req.body.username});
  if(doesExist) return res.status(409).send({message: 'Username already exists'});

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  await user.save();
  const token = await user.generateToken();
  res.status(201).send({user, token});
})

router.post('/login', async(req,res) => {

  const user = await User.findOne({username: req.body.username});
  if(!user) return res.status(404).send({message: 'Username not found!'});
  const isMatch = await bcryptjs.compare(req.body.password, user.password)
  if(!isMatch) return res.status(400).send({message: "Wrong password."});

  const token = await user.generateToken();
  res.status(200).send({user, token});
});

router.post('/user/logout', auth, async(req,res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
      await req.user.save();
      res.status(200).send();
  } catch (error) {
      res.status(500).send();
  }
})

module.exports = router;
