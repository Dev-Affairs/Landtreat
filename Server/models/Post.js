const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    
    postId: String,
    publishedOn: Date,
    updatedOn: Date,
    publishedBy: String,
    publisherEmailId: String,
    isPublished: Boolean,
    slug: String,
    isTrash: Boolean,
    postDetails: {
        title: String,
        description: String,
        content: String,
        featuredImage: String,
        postStatus: String,
        categories: Array,
        postTags: Array
    }
  });

Post = mongoose.model('Post', PostSchema);

module.exports = Post