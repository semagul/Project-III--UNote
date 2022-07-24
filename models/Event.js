const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
	title: String,
    date: String,
    place: String,
	details: String,
	tags: {
		type: [String],
		required: false
	}

});

const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;

