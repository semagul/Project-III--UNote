const router = require("express").Router();
const Audio = require('../models/Audio');

fileSystem = require('fs');
path = require('path');

router.get('/bloburl/:id', (req, res, next) => {
	Audio.findById(req.params["id"])
		.then(foundId => {
			console.log(foundId);
            
            const FNAME = `uploads/${foundId.filename}`;
            console.log(FNAME);
            var stat = fileSystem.statSync(FNAME);

            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
          
            var readStream = fileSystem.createReadStream(FNAME);
            // We replaced all the event handlers with a simple call to util.pump()
            readStream.pipe(res);


		})
		.catch(err => next(err))
})

module.exports = router;

