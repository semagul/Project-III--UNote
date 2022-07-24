const router = require("express").Router();
const Audio = require('../models/Audio');
const multer = require('multer');


router.get('/audios', (req, res, next) => {
	Audio.find()
		.then(audio => {
			// Audio.findOneAndUpdate({ blobURL : { blobURL }}, { $set: { blobURL: `http://localhost:5005/api/bloburl/id` }})
			res.status(200).json(audio)
		})
		.catch(err => next(err))
});


const upload = multer({ dest: 'uploads/' })
router.post('/audios', upload.single('data'), (req, res, next) => {
	const { title, tags } = req.body
	const { blobURL } = req.file.filename

	Audio.create({ title, blobURL, tags })
		.then(audio => {
			res.status(201).json(audio)
		})
		.catch(err => next(err))
});


module.exports = router;