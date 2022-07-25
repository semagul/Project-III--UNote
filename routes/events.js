const router = require("express").Router();
const Event = require('../models/Event');
const User = require("../models/User");

router.get('/events', (req, res, next) => {
	//  console.log('request payload is: ', req.payload)
	Event.find()
		.then(events => {
			res.status(200).json(events)
		})
		.catch(err => next(err))
});

router.post('/events', (req, res, next) => {
	const { title, startDate, place, details, tags } = req.body
	Event.create({
		title, startDate, place, details, tags
	  })
		.then((createdEvent) => {
		  User.findByIdAndUpdate(
			req.payload._id,
			{ $push: { savedEvents: createdEvent._id } },
			{ new: true }
		  )
			.populate('savedEvents')
			.then((updatedUser) => {
			  res.status(200).json(updatedUser);
			});
		})
		.catch((err) => {
		  next(err);
		});
});

module.exports = router;

