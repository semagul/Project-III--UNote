const User = require("../models/User");
const Note = require("../models/Note");
const Event = require("../models/Event");
const Audio = require("../models/Audio");
const router = require("express").Router();

router.get("/allitems", (req, res, next) => {
  const userId = req.payload._id
  User.findById(userId)
    .populate("createdNotes")
    .populate("createdEvents")
    .populate("createdAudios")
    .then(user =>
     { console.log(user)
      res.json(user)}
    )
    .catch(err =>
       next(err)
      )
});


module.exports = router;
