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
const testModel = require('../model/test.model');
var axios = require("axios");

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
      fcmToken: req.body.fcmToken,
      isVerified: req.body.isVerified,  
    });
    console.log(record);
    record.save();
    return res.status(200).send({ IsSuccess: true, Message : "Registration Successfull" , Data: [record]});
  }
});

//add personal Information
router.post("/updatePersonal" , uploadUserProfile.single("img") , async function(req,res,next){
  const { id , name , email , mobile , company_name , referred_by , date_of_birth , gender, 
          address , spouse_name , spouse_birth_date , achievement ,
          number_of_child , img , keyword, business_category, experience, about_business, 
          faceBook , instagram , linkedIn , twitter , whatsApp , youTube
        } = req.body;
  const file = req.file;
  try {
    var update = {
      name : name,
      mobile : mobile,
      email : email,
      company_name : company_name,
      referred_by : referred_by,
      date_of_birth: date_of_birth,
      gender: gender,
      address: address,
      spouse_name: spouse_name,
      spouse_birth_date: spouse_birth_date,
      achievement: achievement,
      number_of_child: number_of_child,
      img: file == undefined ? " " : file.path,
      keyword: keyword,
      business_category: business_category,
      experience: experience,
      about_business: about_business,
      faceBook: faceBook == null ? faceBook : "https://www.facebook.com/",
      instagram: instagram == null ? instagram : "https://www.instagram.com/",
      linkedIn: linkedIn == null ? linkedIn : "https://www.linkedin.com/",
      twitter: twitter == null ? twitter : "https://twitter.com/",
      whatsApp: whatsApp == null ? whatsApp : "https://www.whatsapp.com/",
      youTube: youTube == null ? youTube : "https://www.youtube.com/",
    }
    var record = await model.findByIdAndUpdate( id , update );
    res.status(200).json({ IsSuccess: true , Data: [record] , Message: "Data Updated" });  
  } catch (error) {
    res.status(500).json({ IsSuccess: false , Message: error.message });
  }
});

// router.post("/sendotp", async function(req, res, next) {
//   const { mobile, code, appSignature } = req.body;
//   try {
//       let message = "Your verification code is " + code + " " + appSignature;
//       let msgportal =
//           "http://promosms.itfuturz.com/vendorsms/pushsms.aspx?user=" +
//           process.env.SMS_USER +
//           "&password=" +
//           process.env.SMS_PASS +
//           "&msisdn=" +
//           mobile +
//           "&sid=" +
//           process.env.SMS_SID +
//           "&msg=" +
//           message +
//           "&fl=0&gwid=2";
//       let getresponse = await axios.get(msgportal);
//       if (getresponse.data.ErrorMessage == "Success") {
//           res
//               .status(200)
//               .json({ Message: "Message Sent!", Data: 1, IsSuccess: true });
//       } else {
//           res
//               .status(200)
//               .json({ Message: "Message Not Sent!", Data: 0, IsSuccess: true });
//       }
//   } catch (err) {
//       res.status(500).json({ Message: err.message, Data: 0, IsSuccess: false });
//   }
// });

router.post("/verify", async function(req, res, next) {
  const { mobile, fcmToken } = req.body;
  try {
      let updateCustomer = await testModel.findOneAndUpdate({ mobile: mobile }, { isVerified: true, fcmToken: fcmToken });
      if (updateCustomer != null) {
          res
              .status(200)
              .json({ Message: "Verification Complete!", Data: 1, IsSuccess: true });
      } else {
          res
              .status(200)
              .json({ Message: "Verification Failed!", Data: 0, IsSuccess: true });
      }
  } catch (err) {
      res.status(500).json({ Message: err.message, Data: 0, IsSuccess: false });
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
    res.status(200).json({ IsSuccess: false , Data: 0 , Message: "Data not found" });
  }
});

module.exports = router;

//git remote add origin git@github.com:VENDETTA-STACK/blog-vlog.git