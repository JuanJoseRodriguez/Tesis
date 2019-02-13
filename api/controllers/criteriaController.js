var modelo = mongoose.model('uffremoverModel');
var criteriaList = require('./criterias/criteriaGt2.js');

module.exports = {
	findFunctionsToRestore: async function() {
    return await criteriaList.criteria();
	}
}
