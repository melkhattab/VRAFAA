const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
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

router.post('/signIn',(req, res, next)=>{
  console.log('user : '+JSON.stringify(req.body.body));
  const email = req.body.email ;
  const password = req.body.password ;
  const criteria = {"email":{$eq:email}, "password":{$eq:password}};
  User
  .findOne(criteria)
  .then((user)=>{
    if(user!==null){
      res.status(200).json({
        message:"login success",
        user: user,
      });
    }
    else {
      res.status(404).json({
        message:"User not found",
      });
    }
  })
  .catch((err)=>{
      console.log('login failed');
  })
});

/**
* This method handle user persistence that is received in request's body
*/
router.post('/add_user',(req, res, next)=>{
  console.log(req.body.fname);
  console.log(req.body.lname);
  console.log(req.body.email);
  console.log(req.body.password);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });
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


/************/

router.put('/setWinner',(req, res)=>{
  console.log("winner id is : ", req.body.creator);

  var criteria = {_id:req.body.creator};
  var updates = {'$iswinner':1}
  User.updateOne(criteria,updates,false)
  .exec()
  .then(result =>{
    res.status(200).json({
      message:"The winner have been updated with success",
      artisant: result
    });
  })
  .catch(err =>{
    console.log('No user correspond to the given id');
  });


});


module.exports = router
