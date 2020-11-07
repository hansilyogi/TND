var express = require('express');
var router = express.Router();
var cors = require("cors");
var model = require('../model/test.model');
const { param } = require('./users');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const isEmpty = require('lodash.isempty');
var moment = require('moment');

var userProfile = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads/users");   
  },
  filename: function (req, file, cb) {
      cb(
          null,
          file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
  },
});

var uploadUserProfile = multer({ storage: userProfile });

/* POST Registration (http://localhost:3000/registration) */ 
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
      referred_by : req.body.referred_by,  
    });
    console.log(record);
    record.save();
    return res.status(200).send({ IsSuccess: true, Message : "Registration Successfull" , Data: [record]});
  }
});

//add personal Information
router.post("/updatePersonal" , uploadUserProfile.single("img") , async function(req,res,next){
  const { id , date_of_birth , gender, address , spouse_name , spouse_birth_date , achievement ,
          number_of_child , img , keyword , business_category , experience , about_business ,
        } = req.body;
  const file = req.file;
  var dob = moment(req.body.date_of_birth);
  var spouse_dob = moment(req.body.spouse_birth_date);
  dob = dob.utc().format('YYYY-MM-DD');
  spouse_dob = spouse_dob.utc().format('YYYY-MM-DD');
  try {
    var update = {
      date_of_birth: dob,
      gender: gender,
      address: address,
      spouse_name: spouse_name,
      spouse_birth_date: spouse_dob,
      achievement: achievement,
      number_of_child: number_of_child,
      img: file == undefined ? " " : file.path,
      keyword: keyword,
      business_category: business_category,
      experience: experience,
      about_business: about_business
    }
    var record = await model.findByIdAndUpdate( id , update );
    res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Data Updated" });  
  } catch (error) {
    res.status(500).json({ IsSuccess: false , Message: error.message });
  }
  
});

router.get('/registration/:id',async function(req,res){
  var name = req.params.id;
  var query = { name : name };  
 
  var record = await model.find(query);
  console.log(record);
  if(record){
    res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Data Found" });
  }else{
    res.status(400).json({ IsSuccess: false , Data: 0 , Message: "Data not found" });
  }
});

module.exports = router;

//git remote add origin git@github.com:VENDETTA-STACK/blog-vlog.git