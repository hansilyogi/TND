var mongoose = require('mongoose');
Schema = mongoose.Schema;

var newSchema = mongoose.Schema({
    name: { type: String },
    last_name: { type: String },
});

module.exports = mongoose.model("demo",newSchema);