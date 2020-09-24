var mongoose = require('mongoose');
Schema = mongoose.Schema;

var newSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    company_name: { type: String },
    referred_by: { type: String }
});

module.exports = mongoose.model("test",newSchema);