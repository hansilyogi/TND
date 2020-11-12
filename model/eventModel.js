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
    startDate: [{
        type: String,
    }],
    endDate: [{
        type: String,
    }],
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    }
});

module.exports = mongoose.model("Events",eventSchema);