const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    userRole: {
      type: String,
      default: 'User'
    },
    tokens: [{
      token: {
          type: String,
          required: true
      }
    }]
})

// Virtual
userSchema.virtual('quotes', {
  ref: 'Quote',
  localField: '_id',
  foreignField: 'uploadedBy'
});

// Hash user's password
userSchema.pre('save', async function(next){
  const user = this;
  if(user.isModified('password')) user.password = await bcryptjs.hash(user.password, 8);
  next();
})


userSchema.methods.generateToken = async function() {

  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, '!@#$%^&*.');

  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;

}

// Hide password when you send it back to the frontEnd
userSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject()

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
