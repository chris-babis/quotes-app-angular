const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const Quote = require('../models/Quote');
const auth = require('../middleware/auth');

router.get('/quotes/me', auth, async(req,res) => {
  const user = await User.findOne(req.user._id);
  await user.populate({path: 'quotes'}).execPopulate();
  res.status(200).send({quotes: user.quotes});
})

router.get('/quotes', auth, async(req,res) => {
  const quotes = await Quote.find().sort([['createdAt', -1]]).populate("uploadedBy","-password -tokens");
  const filteredQuotes = quotes.filter(quote => quote.awaiting === false);
  res.status(200).send({quotes: filteredQuotes});
});

router.get('/awaiting', auth, async(req,res) => {
  const quotes = await Quote.find().populate("uploadedBy","-password -tokens");
  const filteredQuotes = quotes.filter(quote => quote.awaiting === true);
  res.status(200).send({quotes: filteredQuotes});
});

router.post('/quote', auth, async(req,res) => {
  const quote = new Quote({
    category: req.body.category,
    quote: req.body.quote,
    author: req.body.author,
    uploadedBy: req.body.uploadedBy,
    awaiting: req.body.awaiting
  })
  await quote.save();
  res.status(201).send({quote});
})

router.put('/accept/:id', auth, async(req,res) => {
  const _id = req.params.id;
  await Quote.findByIdAndUpdate({_id}, req.body);
  res.send({message: 'Updated'})
})

router.delete('/quote/:id', auth, async(req,res) => {
  const _id = req.params.id;

  //check if loggedIn user has that quote
  const quote = await Quote.findOneAndRemove({_id});
  res.send({message: 'Deleted'});
})

module.exports = router;
