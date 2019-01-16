var modelo = mongoose.model('uffremoverModel');
var criteriaList = request(../criterias);

var normalizedPath = require("path").join(__dirname, "routes");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file);
});

module.exports = {
	findFunctionsToRestore: async function() {
		console.log('Entra a criteria!!!');
		criteriaList = ['criteriaGt2.js'];
		dataOptimized = fileNames.reduce(async (newDataOptimized, fileName) => {
			let fileData = fs.readFileSync(`${dir}/${fileName}`);
			let file = await saveFile(fatherFile._id, fileName, fileData)
			return (await newDataOptimized).replace(`uff/${fileName}`, `http://18.222.192.49:3000/api/filesuffId/${file._id}`);
		}, dataOptimized);
	}
}
