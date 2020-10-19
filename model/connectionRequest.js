var mongoose = require('mongoose');

var ConnectionRequest = mongoose.Schema({
    requestSender : [
        { type: mongoose.Types.ObjectId, ref: "Couriers", default: null },
    ],
    requestReceiver : {
        type:String
    },
    requestStatus : {
        type : String
    }
});

module.exports = mongoose.model("connectionRequest",ConnectionRequest);