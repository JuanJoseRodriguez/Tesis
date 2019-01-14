var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new Schema({
	fatherId: Schema.Types.ObjectId, //Only if its a child file
	name : String,
	data: String,
	uses: Number,
});

module.exports = mongoose.model('uffremoverModel',fileSchema);
