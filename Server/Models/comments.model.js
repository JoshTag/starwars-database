const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    id: Number,
    name: String,
    comment: Array,
    timestamp: Date
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;