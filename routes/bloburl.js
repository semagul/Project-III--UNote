const packageJson = require('../package.json');
const router = require("express").Router();
const Audio = require('../models/Audio');

fileSystem = require('fs');
path = require('path');


// this is only and solely for streaming
router.get('/bloburl/:id', (req, res, next) => {
    Audio.findById(req.params["id"])
        .then(foundId => {
            const FNAME = `${packageJson.blobStoreDir}/${foundId.filename}`;
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

