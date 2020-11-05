var express = require('express');
var router = express.Router();
var networkSchema = require('../model/connectionRequest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/networking" , async function(req,res,next){
  const { requestSender , requestReceiver , requestStatus } = req.body;
  try {
    var record = await new networkSchema({
      requestSender: requestSender,
      requestReceiver: requestReceiver,
      requestStatus: requestStatus,
    });
    await record.save();
    // var usersData = await networkSchema.find()
    //                                    .populate({
    //                                      path: "UsersList",
    //                                      select: "name"
    //                                    });
    if(record){
      res.status(200).json({ IsSuccess: true , Data: record , Message: "Request Send Successfully" });
    }else{
      res.status(400).json({ IsSuccess: true , Data: record , Message: "Request Sending Failed" });
    }
  } catch (error) {
    res.status(500).json({ IsSuccess: false , Message: error.message });
  }
});



module.exports = router;
