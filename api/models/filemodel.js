var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new Schema({
	fatherid: Schema.Types.ObjectId, //Solo se completa si es un archivo hijo.
	name : String,
	path : String,
	fullpath : String,
	data: String,
	uses: Number,
});

module.exports = mongoose.model('uffremoverModel',fileSchema);
