const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		title: String,
		startDate: {
			type: Date,
		},
		place: String,
		details: String,
		tags: {
			type: [String],
			required: false
		}
	}
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

