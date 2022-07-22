const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
	{
		title: String,
		description: String,
		tags: [
			{
				type: String,
				required: false,
				// enum: [
				// 	"daily", "podcast", "restaurant", "bar", "spending",
				// 	"earning", "job-search", "coding", "film", "series", "music", "concert",
				// 	"to-do", "period-tracking", "birthday", "networking", "mood-tracking",
				// 	"appointment", "for-tomorrow"
				// ],
				// default: "daily"
			}
		]
	},
	{ timestamps: true }

)

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

