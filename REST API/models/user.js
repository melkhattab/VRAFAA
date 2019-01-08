const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  fname:  String,
  lname:  String,
  email:  String,
  password:String,
  iswinner:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model("User", userSchema);
