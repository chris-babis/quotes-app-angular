const mongoose = require('mongoose');
const quoteSchema = mongoose.Schema({
    category: {
      type: String,
    },
    quote: {
      type: String,
      trim: true
    },
    author: {
      type: String,
      trim: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    awaiting: {
      type: Boolean,
      default: true
    }
},{ versionKey: false,timestamps: true });

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;
