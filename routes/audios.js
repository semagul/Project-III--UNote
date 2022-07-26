const router = require("express").Router();
const Audio = require('../models/Audio');
const User = require('../models/User');
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
	console.log(req.body);
	// console.log("title=" + req.body.evan);
	// console.log("tags=" + req.body.tags);
	const { title, tags } = req.body;
	const filename = req.file.filename;
	console.log(title, tags);
	
	Audio.create({ 
		title, 
		filename, 
		tags 
	})
	.then((createdAudios) => {
		User.findByIdAndUpdate(
			req.payload._id,
			{ $push: { createdAudios: createdAudios._id } },
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