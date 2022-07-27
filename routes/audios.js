const packageJson = require('../package.json');
const unlink = require("node:fs").unlink // function ref with () you would call it here 
const router = require("express").Router() // object with () you instanciate
const Audio = require('../models/Audio')
const User = require('../models/User')
const multer = require('multer')


router.get('/audios', (req, res, next) => {
	Audio.find()
		.then(audio => {
			res.status(200).json(audio)
		})
		.catch(err => next(err))
});


// express does not accept mp3 so multer converts it to a string
const upload = multer({ dest: `${packageJson.blobStoreDir}` });
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
});

router.put('/audios/edit/:id', (req, res, next) => {
	const { title, tags } = req.body
	Audio.findByIdAndUpdate(req.params.id, {
		title,
		tags
	}, { new: true })
	.then(event => {
			res.status(200).json(event)
		})
		.catch(err => next(err))
});

// delete local mp3 with unlink then call the delete function to delete db entry
router.delete('/audios/:id', (req, res, next) => {
    Audio.findById(req.params.id)
        .then(audio => {
			const { filename } = audio
			unlink(`${packageJson.blobStoreDir}/${filename}`, (err) => {
				if (err) throw err;
				console.log(`uploads/${filename} was deleted`);
			  });
			audio.delete()
            res.status(200).json({ message: 'Audio deleted' })
        })
        .catch(err => next(err))
});

module.exports = router;