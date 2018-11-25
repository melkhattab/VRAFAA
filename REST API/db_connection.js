
var mongoose= require('mongoose');
var db_vrafaa = "db_vrafaa";
mongoose.connect('mongodb://127.0.0.1:27017/db_vrafaa',function(err, db){
  if(err){
    throw err ;
  }
  else{
    console.log('connected');
    //console.log(process.env.PORT);
  }
});
