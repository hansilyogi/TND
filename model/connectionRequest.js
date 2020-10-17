var mongoose = require('mongoose');

var ConnectionRequest = mongoose.Schema({
    requestSender : {
        type:String
    },
    requestReceiver : {
        type:String
    },
    requestStatus : {
        type : String
    }
});

module.exports = mongoose.model("connectionRequest",ConnectionRequest);