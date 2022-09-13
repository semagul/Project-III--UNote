const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: String,
    email: String,

    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    createdNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ],
    createdAudios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Audio"
      }
    ]
  }
);

const User = model("User", userSchema);

module.exports = User;