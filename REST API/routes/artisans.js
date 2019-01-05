const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Artisan = require('../models/artisan');
const User = require('../models/user');
const bodyParser = require("body-parser");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename:function(req, file, cb){
    console.log('ggggggggggggggggggg');
    console.log(file);
    cb(null, new Date().toISOString()+file.originalname);
  }
});
const upload = multer({storage:storage})
/* Handling post request for adding an artisant
  Artisant will be attached to the user how have added it
*/
router.post('/add_artisan',(req, res, next)=>{
  const artisan = new Artisan({
    _id : new mongoose.Types.ObjectId(),
    fname: req.body.fname,
    lname: req.body.lname,
    description: req.body.description,
//    videos: req.body.videos,
    creator:  req.body.creator,
    location:{
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        city:req.body.city,
        county: req.body.county,
        state:req.body.state,
      }
  });

  artisan
    .save()
    .then(result =>{
      res.status(200).json({
        message: "The artisan has been added with success",
      });
    })
    .catch(err =>{
      console.log('Artisan did not be added to data base');
    });

});
/*
  Handling Post request for getting Artisants by User
  (artisants added by user)
*/
router.post('/artisanByUser',(req, res, next)=>{
  Artisan.find({creator:req.body.userId})
  .exec()
  .then(users =>{
    res.status(200).json(users);
  })
  .catch(err =>{
    res.status(500).json({
      message: 'No artisan found',
    });
  });

});
/*
  Handling Post request for getting Artisants how have
  as same region as the app user (artisants added by user)
*/
router.post('/artisansByRegion',(req, res, next)=>{
  var criteria = {
                    region:{
                      regionname:"occitanie"
                      //req.body.regionname
                    }
                  };
  Artisan.find(criteria)
  .exec()
  .then(artisants =>{
    res.status(200).json({
      artisants: artisants
    });
  })
  .catch(err =>{
    console.log('No artisan\'s found');
  });
});
/*
  This function handles increment the number of votes of an artisant
*/
router.put('/updatevote',(req, res)=>{

  var criteria = {_id:req.body.artisanId};
  var updates = {$inc:{'votes':1}}
  Artisan.updateOne(criteria,updates,false)
  .exec()
  .then(result =>{
    res.status(200).json({
      message:"The artisan have been updated with success",
      artisant: result
    });
  })
  .catch(err =>{
    console.log('No document found');
  });

});

router.post('/artisans',(req, res, next)=>{
  const criteria = {"location.county":{$eq:"Vaucluse"}};
  Artisan.find(criteria)
  .exec()
  .then(artisans =>{
    res.status(200).json({
      artisans: artisans
    });
  })
  .catch(err =>{
    console.log('No artisans found');
  });
});
router.post('/upload',(req, res, next)=>{
  console.log(req);

  res.status(200).json({
    message: 'the file was uploaded successufly'
  });

});

router.post('/allArtisans',(req, res, next)=>{
  Artisan.find().exec()
  .then(artisans =>{
    res.status(200).json({
      message:'Request succed',
      artisans: artisans
    });
  })
  .catch(err =>{
    console.log('No artisan found');
  });
});

module.exports = router
