var mongoose = require('mongoose');
var modelo  = mongoose.model('Musica');
//angular.module('myApp',[]);
//GET - Return all artists in the DB
exports.findAll = function(req, res) {  //redefino -el metodo FIND que antes solo decia "se encontro"
    modelo.find(function(err, artistas) {
    if(err) res.send(500, err.message);
    console.log('GET /artistas')
        res.status(200).jsonp(artistas);
    });
};

//GET - Return an artist with specified name
exports.findById = function(req, res) {
    modelo.find({"_id":req.params.id}, function(err, artistas) {
    if(err) return res.send(500, err.message);

    console.log('GET /artistas/' + req.params.id);
        res.status(200).jsonp(artistas);
    });
};




//POST - Insert a new artist in the DB
exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);
	var art = new modelo(
		{
			grupo : req.body.grupo,
			origen : req.body.origen,
			//integrantes : req.body.integrantes,
			ano: req.body.ano,
			//albumes : req.body.albumes,
			genero : req.body.genero
		}
	);

	art.save(function(err, art) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(art);
    });
 };

 //PUT - Update a register already exists
exports.update = function(req, res) {
    modelo.findById({"_id":req.params.id}, function(err, art) {
    		console.log(art);
	    	//art.grupo = req.body.grupo,
			//art.origen = req.body.origen,
			//art.integrantes = req.body.integrantes,
			//art.ano = req.body.ano,
			//art.albumes = req.body.albumes,
			//art.genero = req.body.genero
	 		if (req.body.grupo != null) art.grupo = req.body.grupo;
		    if (req.body.origen != null) art.origen = req.body.origen;
		    if (req.body.ano != null) art.ano = req.body.ano;
		    if (req.body.genero != null) art.genero = req.body.genero;
		    console.log(req.body);
        art.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(art);
        });
    });
};


//DELETE - Delete with specified ID
exports.delete = function(req, res) {
    modelo.findById(req.params.id, function(err, art) {
        modelo.remove({"_id":req.params.id}, function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};
