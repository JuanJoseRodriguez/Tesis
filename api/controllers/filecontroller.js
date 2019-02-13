var mongoose = require('mongoose');
var modelo = mongoose.model('uffremoverModel');
var criteria = require('./criteriaController.js');
let fs = require('fs');
const {
	exec
} = require('child_process');

//GET - Return all files in the DB
exports.findAll = function(req, res) {
	modelo.find((err, files) => {
		if (err) res.status(500).send(err.message)
		res.status(200).jsonp(files)
	})
}

//POST Load file into the server
exports.uploadFile = async function(req, res) { //Init of uploadFile

	var form = new formidable.IncomingForm()
	//Check if file is a javaScript file
	form.onPart = function(part, err) {
		console.log('[Info] onPart: ', part)
		if (!part.filename || part.filename.match(/\.(js)$/i) || part.filename.match(/\.(txt)$/i)) {
			this.handlePart(part);
		} else {
			console.log(part.filename + ' is not allowed')
		}
	}

	form.parse(req);

	//Set path where the file is gonna be uploaded
	await form.on('fileBegin', (name, file) => {
		console.log('[Info] fileBegin: ', file);
		file.path = './uploads/' + file.name
		file.fullpath = '/home/ubuntu/tesis/uploads/' + file.name;

	});

	 let pathtxt = "";
	 let pathjs = "";
	 let filename = "";

 await form.on('file', (name, file) => {
	 //Save files and their paths to use uff optimize command
		if (file.name.match(/\.(txt)$/i)) {
			pathtxt = file.path;
			return;
		}
		pathjs = file.path;
		filename = file.name;
		return;
	});

	form.on('end', async () => {
 		//Optimize file with uffremover
		console.log('[Info] paths: ', pathjs , pathtxt);
		let uns = fs.readFileSync(pathjs);
		let fatherFile = await saveFile(null, filename, uns);
		exec('uff optimize_file_browser ' + pathjs + ' ' + pathtxt, (err, stdout, stderr) => { //Init of command uff
			if (err) {
				// node couldn't execute the command
				console.log('Failure executing command "uff optimize_file_browser". ', err);
				return;
			}
			//function saveUffs
			console.log('[Info] Success executing command "uff optimize_file_browser"');
			saveUffs(fatherFile);
			res.status(200).jsonp('http://13.59.133.10:3000/api/filesuffId/' + fatherFile._id)
		});
	});
}

//DELETE - Delete with specified ID
exports.delete = function(req, res) {
	modelo.remove({
		"_id": req.params.id
	},(err) => {
		if (err) return res.status(500).send(err.message);
		res.status(200).send();
	})
}

//removeAllFiles - Remove all files from Mongo
exports.removeAllFiles = function(req, res) {
	modelo.remove((err) => {
		if (err) return res.status(500).send(err.message);
		res.status(200).send();
	})
}

//GET - return a specified file as string by file id
exports.downloadStrbyId = function(req, res) {
	modelo.findById({
		"_id": req.params.id
	},(err, file) => {
		if (err) return res.status(500).send(err.message)
		//If file read is a child, then the uses counter increments in 1
		if (file.fatherId != null)	updateFile(file.id,null,null,null,file.uses + 1)
		res.status(200).send(file.data);
	});
}

//PUT - Update a register already exists
exports.update = function(req, res) {
	updateFile(req.params.id, req.body.data, req.body.fatherId, req.body.name, req.body.uses)
		.then((err, file) => {
			res.status(200).jsonp(file);
		})
		.catch((err) => {
			return res.status(500).send(err.message);
		});
};

//GET - Restore all the funtions that pass a filter
exports.restoreFunctions =  async function(req, res) {
	try{
		console.log('antes de criteria!!!');
		files = await criteria.findFunctionsToRestore();
		console.log('despues de criteria!!!');
		if (typeof files !== 'undefined' && files.length > 0){
			restoreFuncs(files)
			deleteUnusedFiles(files)
		}
		else return res('There are no functions to restore')
		res.status(200)
	} catch(e) {
        return res('Unexpected error occurred');
    }
}

//POST Load file into the server for instrument it
exports.instrumentFile = function(req, res) { //Init of InstrumentFile

	let form = new formidable.IncomingForm()
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
	form.on('fileBegin', (name, file) => {
		file.path = './uploads/' + file.name
		file.fullpath = '/home/ubuntu/tesis/uploads/' + file.name
	})

	form.on('file', async (name, file) => {
		//Instrument file with uffremover
		exec('uff instrument_file ' + file.path, (err, stdout, stderr) => { //Init of command uff
			if (err) {
				// node couldn't execute the command
				console.log('[Error] Failure executing command "uff instrument_file". ', err);
				return;
			}
			//return instrumented file
			console.log('[Info] Success executing command "uff instrument_file"');
			let pathInstrumented = file.path;
			pathInstrumented = 	pathInstrumented.substring(0, pathInstrumented.length - 3) +
													"-instrumented" +
													pathInstrumented.substring(pathInstrumented.length - 3);
			let dataInstrumented = fs.readFileSync(pathInstrumented).toString();
			res.status(200).send(dataInstrumented);
		});
	});
}


//*******************FUNCTIONS*************************
//Update file on mongoDB
async function updateFile(id, data, fatherId, name, uses) {
	return modelo.findById({
			"_id": id
		})
		.then((file) => {
			if (fatherId != null) file.fatherId = fatherId;
			if (name != null) file.name = name;
			if (data != null) file.data = data;
			if (uses != null) file.uses = uses;
			file.save();
			return file;
		})
		.catch((err) => {
			console.log('[Error] Function "updateFile" failed',err)
		});
}

//Read files in uff directory, saving each in mongoDB and replace its name for its id in the optimized file
//then update father data in mongoDB and erase all the files created by uff command
async function saveUffs(fatherFile) {
	let fileOptimizedName = (fatherFile.name).substring(0, (fatherFile.name).lastIndexOf('.')) + '-optimized-min.js';
	let dataOptimized = fs.readFileSync('./uploads/' + fileOptimizedName).toString();
	let dir = './uff';

	fileNames = fs.readdirSync(dir);
	dataOptimized = fileNames.reduce(async (newDataOptimized, fileName) => {
		let fileData = fs.readFileSync(`${dir}/${fileName}`);
		let file = await saveFile(fatherFile._id, fileName, fileData)
		return (await newDataOptimized).replace(`uff/${fileName}`, `http://13.59.133.10:3000/api/filesuffId/${file._id}`);
	  }, dataOptimized);

	updateFile(fatherFile._id, await dataOptimized)
		.then((file) => {
			console.log('[Info] Success calling "updateFile" function with file: ', file._id);
		})
		.catch((err) => {
			console.log('[Error] Failure calling "updateFile" function. ', err);
		});

	exec('sudo sh uffscript.sh', (err) => {
		if (err) {
			return console.log('[Error] Failure executing "uffscript.sh" script. ', err);
		}
		console.log('[Info] Success executing "uffscript.sh" script');
	});
} //end saveUffs

//Create model and save it in mongo
//return de mongo doc created
async function saveFile(fatherId, fileName, data) {
	//create file model
	let file = new modelo({
		fatherId: fatherId,
		name: fileName,
		data: data,
		uses: 0
	})
	//save model into mongodb
	return file.save((err, file) => {
		if (err)
			console.log('[Error] Failure saving file: ', file.name);
		else {
			console.log('[Info] Success saving file: ', file.name);
			return file._id
		}
	});
} //end saveFile

//Find all functions that must be restored to their fathers file
async function findFunctionsToRestore(){
	return modelo.find({
		"uses" : { $gt: 2 }
	})
}

//Restore all functions to their fathers
//Esto deberia retornar solo los ids de las funciones que se devolvieron con exito a su padre
function restoreFuncs(files){
	files.forEach(childFile => {
		modelo.findById({
			'_id' : childFile.fatherId
		})
		.then ((fatherFile) => {
			let newData = (fatherFile.data).replace('eval($dl("http://13.59.133.10:3000/api/filesuffId/' + childFile._id + '"))',childFile.data)
			fatherFile.data = newData
			fatherFile.save()
			console.log('[Info] Success restoring file ',childFile._id)
		})
		.catch((err) => {
			console.log('[Error] Function "restoreFuncs" failed',err)
		})
	})
}

//Delete from Mongo all files that were successfully restored
function deleteUnusedFiles(files){

	let idsToDelete = files.map(file => file._id)

	modelo.deleteMany({ '_id' : { $in: idsToDelete}}, (err) => {
		if (err) {
			console.log('[Error] Function "deleteUnusedFiles" failed',err)
		}
		else {
			console.log('[Info] Success deleting unused files from Mongo ',idsToDelete)
		}
	})
}
