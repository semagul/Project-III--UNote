const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioSchema = new Schema(
	{
		title: String,
		filename: String,
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

