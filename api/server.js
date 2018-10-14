// server.js
// =========

// Incluímos las dependencias que vamos a usar

var express = require("express"),
    app = express();
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/test', function(err, res) {
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

var models = require ('./models/musicmodel')//(app,mongoose);
var MusicCtrl = require('./controllers/musiccontroller.js');

var router = express.Router();
// Index - Route
 router.get('/', function(req, res) {
   res.send("Bienvenido al sistema de Musica y Artistas! - juajua!!!");
 });
app.use(express.static(__dirname + "/public"));

app.use('/index',router);
// API routes
var api = express.Router();

api.route('/artists')
 .get(MusicCtrl.findAll)
 .post(MusicCtrl.add);

api.route('/artists/:id')
 .get(MusicCtrl.findById)
 .put(MusicCtrl.update)
 .delete(MusicCtrl.delete);

app.use('/api', api);

// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});
