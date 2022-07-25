const router = require("express").Router();
// const mongoose = require('mongoose');

const Note = require('../models/Note');

// get all the notes
router.get('/notes', (req, res, next) => {
	Note.find()
		.then(notes => {
			res.status(200).json(notes)
		})
		.catch(err => next(err))
});

// add a new note
router.post('/notes', (req, res, next) => {
	const { title, description, tags } = req.body
	// console.log(req.body)
	Note.create({ title, description, tags })
		.then(note => {
			res.status(201).json(note)
		})
		.catch(err => next(err))
});

module.exports = router;
