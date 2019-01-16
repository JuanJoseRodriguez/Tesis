var modelo = mongoose.model('uffremoverModel');

module.exports = {
	criteria: async function() {
		return modelo.find({
			"uses": {
				$gt: 2
			}
		})
	}
}
