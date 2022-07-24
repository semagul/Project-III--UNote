const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioSchema = new Schema(
	{
		title: String,
		blobURL: String,
		tags: [
			{
				type: String,
				required: false,

			}
		]
	},
	{ timestamps: true }

)

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;

