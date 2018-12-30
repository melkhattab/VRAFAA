const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


/**
* return : list of users
*/
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

/**
* This method handle user persistence that is received in request's body
*/
router.post('/add_user',(req, res, next)=>{
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });
  console.log('user received from client: '+user);

  user
  .save()
  .then(result =>{
    console.log('User has been added successufly');
    res.status(200).json({
      message: "User has been added successufly",
      user: user
    });
  }).catch(err =>{
    console.log('User has not been added to dbase');
  });

});
module.exports = router
