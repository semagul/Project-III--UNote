const router = require("express").Router();
const Event = require('../models/Event');
const User = require("../models/User");

router.get('/events', (req, res, next) => {
	//  console.log('request payload is: ', req.payload)
	const userId = req.payload._id
	User.findById(userId)
		.populate("createdEvents")
		.then(user => {
			res.status(200).json(user)
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
				{ $push: { createdEvents: createdEvent._id } },
				{ new: true }
			)
				.populate('createdEvents')
				.then((updatedUser) => {
					res.status(200).json(updatedUser);
				});
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/events/:id', (req, res, next) => {
	Event.findById(req.params.id)
		.then(event => {
			res.status(200).json(event)
		})
		.catch(err => next(err))
});

// put request is to update
router.put('/events/:id', (req, res, next) => {
	const { title, startDate, place, details, tags } = req.body
	Event
	.findByIdAndUpdate(req.params.id, {
		title,
		startDate,
		place,
		details,
		tags
	}, { new: true })
	.then(event => {
			res.status(200).json(event)
		})
		.catch(err => next(err))
});

router.delete('/events/:id', (req, res, next) => {
	Event.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'Event deleted' })
		})
		.catch(err => next(err))
});


module.exports = router;

