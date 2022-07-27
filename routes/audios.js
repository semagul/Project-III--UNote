const router = require("express").Router();
const Audio = require('../models/Audio');
const User = require('../models/User');
const multer = require('multer');

router.get('/audios', (req, res, next) => {
	Audio.find()
		.then(audio => {
			res.status(200).json(audio)
		})
		.catch(err => next(err))
});

// express does not accept mp3 so multer converts it to a string
const upload = multer({ dest: 'uploads/' });
router.post('/audios', upload.single('data'), (req, res, next) => {
	const { title, tags } = req.body;
	const filename = req.file.filename;
	
	Audio.create({ title, filename, tags 
	})
	.then((createdAudio) => {
		User.findByIdAndUpdate(
			req.payload._id,
			{ $push: { createdAudios: createdAudio._id } },
			{ new: true }
		)
			.populate('createdAudios')
			.then((updatedUser) => {
				res.status(200).json(updatedUser);
			})
	})
	.catch((err) => {
		next(err)
	})
})

router.get('/audios/:id', (req, res, next) => {
	Audio.findById(req.params.id)
		.then(audio => {
			res.status(200).json(audio)
		})
		.catch(err => next(err))
})

// put request is to update
router.put('/audios/:id', (req, res, next) => {
	const { title, tags } = req.body
	Audio.findByIdAndUpdate(req.params.id, {
		title,
		tags
	}, { new: true })
	.then(audio => {
			res.status(200).json(audio)
		})
		.catch(err => next(err))
})

router.delete('/audios/:id', (req, res, next) => {
	Audio.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'Audio deleted' })
		})
		.catch(err => next(err))
})


module.exports = router;