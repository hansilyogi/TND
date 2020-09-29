var express = require('express');
var router = express.Router();
var model = require('../model/test.model');
const { param } = require('./users');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const isEmpty = require('lodash.isempty');
/* GET home page. */ 
router.post('/', async function(req, res, next) {

  if(isEmpty(req.body)){
    res.status(404).send("404 ERROR");
  }
  else{
    var record = new model({
      name : req.body.name,
      mobile : req.body.mobile,
      email : req.body.email,
      company_name : req.body.company_name,
      referred_by : req.body.referred_by  
    });
    console.log(record);
    record.save();
    return res.status(200).send({success: true, Message : "Registration Successfull"});
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