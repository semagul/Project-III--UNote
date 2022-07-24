const router = require("express").Router();

const Event = require('../models/Event');

router.get('/events', (req, res, next) => {
	Event.find()
		.then(events => {
			res.status(200).json(events)
		})
		.catch(err => next(err))
});

router.post('/events', (req, res, next) => {
	const { title, date, place, details, tags } = req.body
	
	Event.create({ title, date, place, details, tags })
		.then(event => {
			res.status(201).json(event)
		})
		.catch(err => next(err))
});

module.exports = router;

