const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Artisant = require('../models/artisant');
const User = require('../models/user');


/* Handling post request for adding an artisant
  Artisant will be attached to the user how have added it
*/
router.post('/add_artisant',(req, res, next)=>{
  const artisant = new Artisant({
    _id : new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    description: req.body.description,
    videos: req.body.videos,
    creator:  req.body.creator,
    region: req.body.region
  });
  artisant
    .save()
    .then(result =>{
      res.status(200).json({
        message: "The artisant have been added with success",
      });
    })
    .catch(err =>{
      console.log('Artisant did not be added to dbase');
    });

});

/*
  Handling Post request for getting Artisants by User
  (artisants added by user)
*/
router.post('/artisantByUser',(req, res, next)=>{
  Artisant.find({creator:req.body.userId})
  .exec()
  .then(users =>{
    res.status(200).json(users);
  })
  .catch(err =>{
    res.status(500).json({
      message: 'No document found',
    });
  });

});
/*
  Handling Post request for getting Artisants how have
  as same region as the app user (artisants added by user)
*/
router.post('/artisantsByRegion',(req, res, next)=>{
  var criteria = {
                    region:{
                      regionname:req.body.regionname
                    }
                  };
  Artisant.find(criteria)
  .exec()
  .then(artisants =>{
    res.status(200).json(artisants);
  })
  .catch(err =>{
    console.log('No document found');
  });
});
/*
  This function handles increment the number of votes of an artisant
*/
router.put('/updatevote',(req, res)=>{
  var criteria = {_id:req.body.artisantId};
  var updates = {$inc:{'votes':1}}
  Artisant.update(criteria,updates,false)
  .exec()
  .then(result =>{
    res.status(200).json({
      message:"The artisant have been updated with success",
      artisant: result
    });
  })
  .catch(err =>{
    console.log('No document found');
  });

});
module.exports = router
