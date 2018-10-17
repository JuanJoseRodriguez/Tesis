var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new Schema({
	name : String,
	path : String,
	fullpath : String,
	uses: Number,
});

module.exports = mongoose.model('File',fileSchema);
