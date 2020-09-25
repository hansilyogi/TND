var express = require('express');
var router = express.Router();
var model = require('../model/form_model');
const { param } = require('./users');

router.post('/',function(req,res,next){
    var record = new model({
        name : req.body.fname,
        last_name : req.body.lname
      });
      console.log(record);
      record.save();
    // console.log(req.body);
    // console.log("work");
    res.sendFile("/home/monil/Front/directory.html");
});

router.get('/',function(req,res,next){
    res.sendFile("/home/monil/Front/index.html");
});

module.exports = router;