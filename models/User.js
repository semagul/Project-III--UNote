const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
    email: String,

    savedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    savedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ],
    savedAudios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Audio"
      }
    ]
  }
);

const User = model("User", userSchema);

module.exports = User;