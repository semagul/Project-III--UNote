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


const upload = multer({ dest: 'uploads/' })
router.post('/audios', upload.single('data'), (req, res, next) => {
	const { title, tags } = req.body;
	const filename = req.file.filename;
	console.log(title, tags);
	
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
			});
	})
	.catch((err) => {
		next(err);
	});
});


module.exports = router;