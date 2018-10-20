var mongoose = require('mongoose');
var modelo  = mongoose.model('Files');

//GET - Return all artists in the DB
exports.findAll = function(req, res) {
    modelo.find(function(err, files) {
    if(err) res.send(500, err.message);
    console.log('GET /files')
        res.status(200).jsonp(files);
    });
};

//GET - Return an artist with specified name
exports.findById = function(req, res) {
      modelo.find({"_id":req.params.id}, function(err, file) {
      if(err) return res.send(500, err.message);
      console.log('GET /files/' + req.params.id);
      res.status(200).json(file);
    });
};

//POST - Insert a new artist in the DB
exports.add = function(req, res) {
    console.log('POST');
    console.log(req.files.file);
    //Deserializa los datos del archivo antes de guardarlo en la DB
      var serialize = require('node-serialize');
      var uns = serialize.unserialize(req.files.file.data);
      console.log(uns);
	var fil = new modelo(
		{
      name : req.files.file.name,
      file : req.files.file,
      dato : req.files.file.data,
      cont : 0,
		}
	);

	fil.save(function(err, art) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(art);
  });
 };

  //PUT - Update a register already exists
 exports.update = function(req, res) {
     modelo.findById({"_id":req.params.id}, function(err, fil) {
     		console.log(fil);
   	 		if (req.body.name != null) fil.name = req.body.name;
   		  if (req.body.file != null) fil.file = req.body.file;
        if (req.body.data != null) fil.data = req.body.data;
   		  if (req.body.cont != null) fil.cont = req.body.cont;
   		  console.log(req.body);
        fil.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(fil);
        });
     });
 };

 //DELETE - Delete with specified ID
 exports.delete = function(req, res) {
     modelo.findById(req.params.id, function(err, fil) {
         modelo.remove({"_id":req.params.id}, function(err) {
             if(err) return res.status(500).send(err.message);
       res.status(200).send();
         })
     });
 };
