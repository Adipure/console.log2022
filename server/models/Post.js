const { Schema, model } = require('mongoose');
const Comment = require('./Comment.js');

const Post = new Schema({
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    topics: [{
        type: String,
        required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [Comment]
}, { timestamps: true })

Post.virtual('commentCount').get(function() {
    return this.comments.length;
})

module.exports = model('post', Post)
