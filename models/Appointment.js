const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	title: String,
	description: String,
    when: Date,
    where: String,
	tag: {
		type: String,
		required: true,
		enum: ["daily", "podcast", "restaurant", "bar", "spending", 
		"earning", "job-search", "coding", "film", "series", "music", "concert", 
		"to-do", "period-tracking", "birthday", "networking", "mood-tracking",
		"appointment", "for-tomorrow"]
	},

});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

