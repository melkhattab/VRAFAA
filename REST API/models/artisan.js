const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artisanSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  fname:  String,
  lname: String,
  description:  String,
  votes: {
    type:Number,
    default:0
  },
  videos: [
    {
      url:String,
      duration:Number
    }
  ],
  creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location:{
    longitude: String,
    latitude:String,
    city:String,
    county:String,
    state: String,
  }
});
module.exports = mongoose.model("Artisan", artisanSchema);
