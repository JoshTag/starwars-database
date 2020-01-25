const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: Date
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
