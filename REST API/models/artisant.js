const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artisantSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  fname:  String,
  lname: String,
  description:  String,
  votes: {
    type:Number,
    t
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
  region: {
    longitude: String,
    latitude:String,
    regionname: String
  }
});
module.exports = mongoose.model("Artisant", artisantSchema);
