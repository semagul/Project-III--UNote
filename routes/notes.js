const router = require("express").Router();
const Note = require('../models/Note');
const User = require('../models/User');

router.get('/notes', (req, res, next) => {
	//  console.log('request payload is: ', req.payload)
	Note.find()
		.then(notes => {
			res.status(200).json(notes)
		})
		.catch(err => next(err))
});

router.post('/notes', (req, res, next) => {
	const { title, description, tags } = req.body
	Note.create({ 
		title, description, tags
	 })
	 .then((createdNote) => {
		User.findByIdAndUpdate(
			req.payload._id,
			{ $push: { createdNotes: createdNote._id } },
			{ new: true }
		)
			.populate('createdNotes')
			.then((updatedUser) => {
				res.status(200).json(updatedUser);
			});
	})
	.catch((err) => {
		next(err);
	});
});

router.get('/notes/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then(event => {
			res.status(200).json(event)
		})
		.catch(err => next(err))
});

router.put('/notes/:id', (req, res, next) => {
	const { title, description, tags } = req.body
	Note.findByIdAndUpdate(req.params.id, {
		title,
		description,
		tags
	}, { new: true })
		.then(note => {
			res.status(200).json(note)
		})
		.catch(err => next(err))
});

router.delete('/notes/:id', (req, res, next) => {
	Note.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'Note deleted' })
		})
		.catch(err => next(err))
});

module.exports = router;
