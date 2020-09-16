const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Routers
const userRouter = require('./routers/User');
const quoteRouter = require('./routers/Quote');

mongoose.connect('mongodb://localhost:27017/quotesUsersDB', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
  .then(() => console.log("connected here"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use(userRouter);
app.use(quoteRouter);

module.exports = app;
