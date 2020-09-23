var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var collection = req.app.locals.collection;
  collection.find({}).toArray(function(err,data){
    if(err) throw err;
    //var cus = res.json(data);
    console.log(data);
    res.send(data);
    //res.render('image',{ head_data : 'Customer Information ' , records : data });
  });

  //res.render('index', { title: 'Express' });
});

module.exports = router;
