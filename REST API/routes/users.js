const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/users',(req, res, next)=>{
  User.find()
  .exec()
  .then(users =>{
    res.status(200).json({
      message: "Users found",
      users: users
    });
  })
  .catch(err =>{
    console.log('No document found');
  });


});

router.post('/add_user',(req, res, next)=>{
  const user = new User({
    _id : new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    region: {
      longitude:req.body.longitude,
      latitude:req.body.latitude,
      regionname: req.body.regionname
    }
  });
  user
  .save()
  .then(result =>{
    res.status(200).json({
      message: "Handeling post requests",
      user: user
    });
  }).catch(err =>{
    console.log('user did not be added to dbase');
  });

});
module.exports = router
