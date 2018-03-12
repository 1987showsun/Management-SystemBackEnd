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
router.get('/status', function(req, res, next) {
  skyline.collection('status').find({}).toArray(function(err,data) {
    res.json({
      data : data
    })
  });
});

router.get('/leave/select', function(req, res, next) {
  skyline.collection('select').find({}).toArray(function(err,data) {
    res.json({
      data : data
    })
  });
});

router.get('/leave/list', function(req, res, next) {
  skyline.collection('leave').find({member_id : ObjectId("5a8e47daf9587727a0fba570")}).toArray(function(err,data) {
    res.json({
      data : data
    })
  });
});

router.get('/leave/detailed/:id', function(req, res, next) {
  var id   = req.params.id;
  skyline.collection('leave').find({_id : ObjectId(id)}).toArray(function(err,data) {
    res.json({
      data : data
    })
  });
});

router.get('/searchMember/:name', function(req, res, next) {
  var name   = req.params.name;
  skyline.collection('member').find({name_cn:name}).toArray(function(err,data) {
    res.json({
      data : data
    })
  });
});

router.get('/pos/getStore', function(req, res, next) {
  var name   = req.params.name;
  skyline.collection('store').find().toArray(function(err,data) {
    res.json({
      data : data
    })
  });
});

router.get('/pos/getStore/:id', function(req, res, next) {
  var id   = req.params.id;
  skyline.collection('storeInfo').find({store_Id:ObjectId(id)}).toArray(function(err,storeBranch) {
    res.json({
      data : storeBranch
    })
  });
});

router.get('/pos/getStoreMenu/:id', function(req, res, next) {
  var id              = req.params.id,
      menu            = [],
      newKey          = [],
      removeKeyArray  = ['_id','store_id'],
      newData         = [];
  skyline.collection('storeMenu').find({store_id:ObjectId(id)}).toArray(function(err,storeMenu) {
    var newKey = Object.keys( storeMenu[0] );
    function removeKey(query){
      return newKey.filter(function(el,i){
        return el.indexOf(query);
      })
    }
    removeKeyArray.filter(function( el,i ){
      newKey = removeKey(el);
    })

    newKey.map(function(key,i){
      newData.push( storeMenu[0][key] )
    })

    res.json({
      data : newData
    })
  });
});

router.get('/pos/task', function(req, res, next) {
  skyline.collection('posTask').find({}).toArray(function(err,task) {
    res.json({
      data : task
    })
  });
});


module.exports = router;
