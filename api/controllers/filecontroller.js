var mongoose = require('mongoose');
var modelo = mongoose.model('uffremoverModel');
//var serialize = require('node-serialize');
let fs = require('fs');
const {
	exec
} = require('child_process');

//GET - Return all fils in the DB
exports.findAll = function(req, res) {
	modelo.find(function(err, files) {
		if (err) res.send(500, err.message);
		res.status(200).jsonp(files)
	})
}

//POST Load file into the server
exports.uploadFile = function(req, res) { //Init of uploadFile

	var form = new formidable.IncomingForm()
	//Check if file is a javaScript file
	form.onPart = function(part, err) {
		if (!part.filename || part.filename.match(/\.(js)$/i)) {
			this.handlePart(part);
		} else {
			console.log(part.filename + ' is not allowed')
		}
	}

	form.parse(req)

	//Set path where the file is gonna be uploaded
	form.on('fileBegin', function(name, file) {
		file.path = './uploads/' + file.name
		file.fullpath = '/home/ubuntu/tesis/uploads/' + file.name
	})

	form.on('file', async (name, file) => {
		//Optimize file with uffremover
		let uns = fs.readFileSync(file.path);
		let fatherid = await saveFile(null, file.name, uns);
		exec('uff optimize_file_browser ' + file.path + ' profiling.txt ', (err, stdout, stderr) => { //Init of command uff
			if (err) {
				// node couldn't execute the command
				console.log("Error en el comando UFF", err);
				return;
			}
			//function saveUffs
			console.log("[Info] Se ejecuto el comando UFF con éxito.");
			saveUffs(fatherid);
			res.status(200);
		});
	});


}

//GET - return a specified file
exports.download = function(req, res) {
	modelo.find({
		"_id": req.params.id
	}, function(err, files) {
		if (err) return res.send(500, err.message);
		let filename = files[0].name;
		let fileLocation = files[0].fullpath;
		res.download(fileLocation, filename)
	});
}

//DELETE - Delete with specified ID
exports.delete = function(req, res) {
	modelo.findById(req.params.id, function(err, art) {
		modelo.remove({
			"_id": req.params.id
		}, function(err) {
			if (err) return res.status(500).send(err.message);
			res.status(200).send();
		})
	});
}

//GET - return a specified file as string by file name
exports.downloadStr = function(req, res) {
	fs.readFile('./uploads/' + req.params.name, 'utf-8', (err, data) => {
		if (err) {
			console.log('error: ', err);
		} else {
			res.status(200).send(data)
		}
	});
}

//GET - return a specified file as string by file id
exports.downloadStrbyId = function(req, res) {
	modelo.findById({
		"_id": req.params.id
	}, function(err, file) {
		if (err) return res.send(500, err.message);
		res.status(200).send(file.data);
	});
}

//PUT - Update a register already exists
exports.update = function(req, res) {
	updateFile(req.params.id, req.body.data, req.body.fatherid, req.body.name, req.body.uses)
		.then((err, file) => {
			res.status(200).jsonp(file);
		})
		.catch((err) => {
			return res.status(500).send(err.message);
		});
};

//*******************FUNCTIONS*************************
async function updateFile(id, data, fatherid, name, uses) {
	modelo.findById({
			"_id": id
		})
		.then(function(file) {
			if (fatherid != null) file.fatherid = fatherid;
			if (name != null) file.name = name;
			if (data != null) file.data = data;
			if (uses != null) file.uses = uses;
			return file;
		})
		.then(function(file) {
			file.save();
			console.log("[Info] La modificación se realizo con éxito.")
		})
		.catch((err) => {
			console.log("[Error] Error al modificar.")
		});

}

async function saveUffs(fatherid) {
	let dataOptimized = fs.readFileSync('./uploads/app-optimized-min.js').toString();
	let dir = './uff';

	files = fs.readdirSync(dir);

	await files.forEach((fileName) => {
		let dat = fs.readFileSync(dir + '/' + fileName);
		//save file
		console.log('[Info] Variables saveFile', fatherid, fileName, dat);
		let fileId = saveFile(fatherid, fileName, dat)
			.then(() => {
				dataOptimized =
					dataOptimized.replace('uff/' + fileName, 'http://18.222.186.18:3000/filesuffId/' + fileId);
				console.log('[Info] dataOptimized1: ');
			})
			.catch((err) => {
				console.log('[Error] Error en saveFile - saveUffs ', err);
			});
	}); //End forEach

	updateFile(fatherid, dataOptimized)
		.then((file) => {
			console.log("[Info] Exito al llamar a la funcion updateFile: ", file);
		})
		.catch((err) => {
			console.log("[Error] Error en la funcion updateFile.");
		});

	exec('sudo sh uffscript.sh', (err) => {
		if (err) {
			return console.log("[Error]Error al ejecutar el script uffscript.sh: ", err);
		}
		console.log("[Info] El script uffscript.sh se ejecuto con éxito");
	});
}

async function saveFile(fatherid, fileName, data) {
	let f = new modelo({
		fatherid: fatherid,
		name: fileName,
		path: null,
		fullpath: null,
		data: data,
		uses: 0
	})
	//save model into mongodb

	return f.save((err, f) => {
		if (err)
			console.log('[Error] Error al guardar el archivo: ', f);
		else {
			console.log('[Info] Se guardo con exito el archivo llamado ', f.name);
			return f._id
		}
	}); //End save
} //end saveFile
