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
        type: String,
    },
    startDte: [{
        type: String,
    }],
    endDate: [{
        type: String,
    }],
});

module.exports = mongoose.model("Events",eventSchema);