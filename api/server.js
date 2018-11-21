// server.js
// =========

// Incluímos las dependencias que vamos a usar

var express = require("express"),
    app = express();
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

// Connection to DB
mongoose.connect('mongodb://localhost/new_usr', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

//Middlewares
// Configuramos la app para que pueda realizar métodos REST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (req, res, next) {
	//Se habilita CORS para que el cliente pueda consumir los end-points.
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,  Content-Type, Accept");
  next();
});
var models = require ('./models/fileModel.js');//(app,mongoose);
//var MusicCtrl = require('./controllers/musiccontroller.js');
var FilesCtrl = require('./controllers/fileController.js');

var router = express.Router();
// Index - Route
 router.get('/', function(req, res) {
   res.send("Bienvenido al sistema de Musica y Artistas! - juajua!!!");
 });
app.use(express.static(__dirname + "/public"));

app.use('/index',router);

app.use(fileUpload());
//app.post('/upload',(req,res) => {
  //  let EDFile = req.files.file
    //EDFile.mv(`./file-upload-demo/${EDFile.name}`,err => {
      //  if(err) return res.status(500).send({ message : err })

        //return res.status(200).send({ message : 'File upload' })
    //})
//})
// API routes
var api = express.Router();
app.use('/api', api);

api.route('/upload')
 .get(FilesCtrl.findAll)
 .post(FilesCtrl.add);

api.route('/upload/:id')
 .get(FilesCtrl.findById)
 .put(FilesCtrl.update)
 .delete(FilesCtrl.delete);

 api.route('/fileuff/:id')
  .get(FilesCtrl.findByIdStr);

// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});
