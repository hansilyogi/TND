var express = require('express');
var router = express.Router();
var model = require('../model/test.model');
const { param } = require('./users');

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.type == "insert"){
    
    var record = new model({
      name : req.body.name,
      mobile : req.body.mobile,
      email : req.body.email,
      company_name : req.body.company_name,
      referred_by : req.body.referred_by,
    });
    console.log(record);
    record.save();
    return res.status(200).send({success: true, data: record});
  }
  else{
    res.status(404).send("404 ERROR");
    //res.send()
    // var collection = req.app.locals.collection;
    // collection.find({}).toArray(function(err,data){
    // if(err) throw err;
    
    // console.log(data);
    // res.send(data);
    
  //});
  }

  //res.render('index', { title: 'Express' });
});

router.get('/:id',async function(req,res){
  var name = req.params.id;
  // var name = req.body.name;
  var query = { name : name };  
  // var record = await model.findById(name,{});
  var record = await model.find(query);
  console.log(record);
  res.json(record);
  // if(record){
  //   res.status(200).send(`Found Records : ${json(record)}`);
  // }
  // else{
  //   res.status(404).send("404 ERROR");
  // }
});

module.exports = router;



//git remote add origin git@github.com:VENDETTA-STACK/blog-vlog.git