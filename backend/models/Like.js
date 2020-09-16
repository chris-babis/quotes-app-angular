const mongoose = require('mongoose');
const likeSchema = mongoose.Schema({
    quoteID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Quote'
    },
    userIDs: [{
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    }]
})

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
