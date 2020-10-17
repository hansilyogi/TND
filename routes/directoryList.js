var express = require('express');
var router = express.Router();

var connectionRequestSchema = require('../model/connectionRequest');
var directoryData = require('../model/test.model');

router.post('/directorylisting', async function(req , res , next){
    try {
        let directoryList = await directoryData.find();
        if(directoryList != null){
            res.status(200).json({ Message: "Data Found...!!!", Count : directoryList.length , Data: directoryList, IsSuccess: true });
        }else{
            res.status(400).json({ Message: "Data Not Found...!!!", IsSuccess: false });
        }
    } catch (error) {
        res.status(500).json({ Message: "Something Wrong...!!!", IsSuccess: false });
    }
});

module.exports = router;