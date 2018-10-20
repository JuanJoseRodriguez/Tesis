var mongoose = require('mongoose');
var modelo  = mongoose.model('File');

//GET - Return all fils in the DB
exports.findAll = function(req, res) {
    modelo.find(function(err, files) {
    if(err) res.send(500, err.message);
    res.status(200).jsonp(files)
    })
}

//POST Load file into the server
exports.uploadFile =  function (req, res){

    var form = new formidable.IncomingForm()
    form.onPart = function (part,err) {
        if(!part.filename || part.filename.match(/\.(js)$/i)) {
            this.handlePart(part);
        }
        else {
            console.log(part.filename + ' is not allowed')
        }
    }

    form.parse(req)
    form.on('fileBegin', function (name, file){
        file.path = './uploads/' + file.name
        file.fullpath = '/home/bitnami/api/uploads/' + file.name
    })

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name)
        var f = new modelo(
          {
            name : file.name,
            path : file.path,
            fullpath : file.fullpath,
            uses : 0
          }
        )

        f.save(function(err, f) {
            if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(f)
        });
    })
  }

  //GET - return a specified file
  exports.download = function(req, res) {
      modelo.find({"_id":req.params.id}, function(err, files) {
        if(err) return res.send(500, err.message);

        console.log('dentro del find')
        var filename = files[0].name;
        var fileLocation = files[0].fullpath;
        res.filename = filename
        res.filetype = 'text/javascript'
        res.download(fileLocation,filename,function(){
          res.file = filename
          console.log("file  ", res.file)
        })

        console.log("filename ", res.filename)
      });
  }

  //DELETE - Delete with specified ID
  exports.delete = function(req, res) {
      modelo.findById(req.params.id, function(err, art) {
          modelo.remove({"_id":req.params.id}, function(err) {
              if(err) return res.status(500).send(err.message);
              res.status(200).send();
          })
      });
  };
