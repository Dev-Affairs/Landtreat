const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const Post = require('../models/Post');
const Sequence = require('../models/Sequence');
const PropertyWatchlist = require('../models/PropertyWatchlist');
const FeatureProperties = require('../models/FeatureProperties')
const adminConfig = require('../config/adminConfig.json')
const serverConfig = require('../config/serverConfig.json')
const {updateSitemap} = require('../services/sitemap')


module.exports.addNewPost = async (req, res) => {
    console.log("addNewPost--", req.body)
    let {formData, UID} = req.body
    try {
        // let user = await User.findOne({ UID });
        let postId = await getPostSeqence()
        formData['postId'] = "Post-"+postId
        // console.log("propertyId-- logging property sequence ...", propertyId)
        const newPost = new Post(formData);
        await newPost.save();
        updateSitemap(`${serverConfig.appUrl}/post/${formData.slug}`, 'post')
        res.send({ success: true, message: 'Post Added successfully', data: newPost });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}


module.exports.updatePost = async (req, res) => {
    try {
        const updateData = req.body.updateData;
        const postId = req.body.postId
        const slug = req.body.slug

        console.log("updateData--", updateData)
        console.log("postId--", postId)
          try {
      const updatedDoc = await Post.findOneAndUpdate(
        { postId: postId }, // Find by 'username' key
        updateData,
        { new: true } // This option returns the updated document
        );
        updateSitemap(`${serverConfig.appUrl}/post/${slug}`, 'post')

        console.log('Updated Document:', updatedDoc);
        res.send({ success: true, message: 'Post updated successfully', data: updatedDoc });
      } catch (err) {
        console.error('Error updating record:', err);
        res.send({ success: false, message: 'Post updated faled', error: err });
      }
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}

module.exports.findPosts = async (req, res) => {
    let query = req.body.query || {}
    let limit = req.body.limit || 0
    try {
      // console.log("query--", req.body)
        Post.find(query).limit(limit).then((post, error)=> {
          if(error){
            console.log("error---", error)
            res.status(500).send({ success: false, message: error.message });
            return
          }
            // console.log("property ==", property)
            if(post){
                res.send({ success: true, data: post });
            }
            else{
                res.send({ success: false});
            }

        })
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}

async function getPostSeqence(){
    console.log("inside add new prop")
    const PostSeq = await Sequence.findOneAndUpdate(
        { name: "postIdSequence" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      if(PostSeq){
          return PostSeq.seq
      }
      else{
        return false
      }
}