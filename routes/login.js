var express = require('express');
var router = express.Router();
var model = require('../model/test.model');
//Access-Control-Allow-Origin

router.post('/',async function(req,res,next){
    
    const mobile = req.body.mobile;

    try {
        var record = await model.find({ mobile: mobile});
        if(record.length == 1){
            res.status(200).json({ IsSuccess: true , Data: 1 , Message: "User LoggedIn" });
        }else{
            res.status(400).json({ IsSuccess: true , Data: 0 , Message: "User Not Found. PLease Register" });
        }
        // console.log(record.length);    
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
  });

module.exports = router;