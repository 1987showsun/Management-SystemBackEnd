var guessbase_url   = 'mongodb://127.0.0.1:27017/skyline';
var express         = require('express');
var ObjectId        = require('mongodb');
var MongoClient     = require('mongodb').MongoClient;
var ObjectId        = require('mongodb').ObjectID;
var router          = express.Router();

MongoClient.connect( guessbase_url , function(err, data){
  skyline = data;
});

/* GET home page. */
router.post('/leave/form', function(req, res, next) {
  console.log( req.body.val );
  /*skyline.collection('status').find({}).toArray(function(err,data) {
    res.json({
      data : data
    })
  });*/
});

router.post('/pos/addTask', function(req, res, next) {
  skyline.collection('posTask').insert( req.body.val , function(err, data){
    res.json({
      data : data
    })
  });
});

module.exports = router;
