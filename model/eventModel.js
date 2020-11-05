var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    eventName: {
        type:String,
        require: true
    },
    eventImage: {
        type:String
    },
    eventOrganiseBy: {
        type: mongoose.Types.ObjectId, ref: "UsersList", default: null
    },
    startDte: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Events",eventSchema);