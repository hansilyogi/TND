var express = require('express');
var router = express.Router();
var model = require('../model/test.model');
//Access-Control-Allow-Origin

router.post('/',async function(req,res){

    var mobile_data = await model.findOne({ mobile: req.body.mobile});
    if(mobile_data.length == 0){
        // var result = {};
        // result.Message= "Not Found.";
        // result.Data = [];
        // result.isSuccess = false;
        // res.json(result);
        res.status(400).json({ IsSuccess: false , Data: [] , Message: "Number Not Register" });
    }
    else{
        // var result = {};
        // result.Message= " Found.";
        // result.Data = [mobile_data];
        // result.isSuccess = true;
        // res.json(result);
        res.status(200).json({ IsSuccess: true , Data: [mobile_data] , Message: "User LoggedIn" });
    }
    
    // console.log(JSON.parse(mobile_data));
    // var query = { mobile : mobile };  
    // var record = await model.find(query);
    // console.log(record);
    // res.json(record);
  });

module.exports = router;