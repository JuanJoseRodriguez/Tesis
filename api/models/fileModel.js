var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fileSchema = new Schema({
  name : String,
	file : Object,
  dato : String,
	cont : Number,
});
/*
fileSchema.path('file').validate(function (v) {
    return ((v != "") && (v != null)); //nombre de grupo no puede ser null (validador)
});
*/
module.exports = mongoose.model('Files',fileSchema);
