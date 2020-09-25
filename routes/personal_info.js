var express = require('express');
var router = express.Router();
var model = require('../model/personal_info');

/* POST Personal Directory. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.type == "insert"){
    
    var record = new model({
        date_of_birth : req.body.date_of_birth,
        gender : req.body.gender,
        address : req.body.address,
        spouse_name : req.body.spouse_name,
        spouse_birth_date : req.body.spouse_birth_date,
        number_of_child : req.body.number_of_child,
    });
    console.log(record);
    record.save();
    res.json(record);
    //return res.status(200).send({success: true, data: record});
  }
  else{
    res.status(404).send("404 ERROR");
  }
});


module.exports = router;
