var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicSchema = new Schema({
	grupo : String,
	origen : String,
//	integrantes : [ {nombre:String} ],
	ano: Number,
//	albumes : [{ alb:String,ano:Number }],
//	genero : [{gen:String}]
	genero : String
});
/*
musicSchema.path('grupo').validate(function (v) {
    return ((v != "") && (v != null)); //nombre de grupo no puede ser null (validador)
});
*/
module.exports = mongoose.model('Musica',musicSchema);
