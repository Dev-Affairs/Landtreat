const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const SavedItem = require('../models/SavedItem');
const Sequence = require('../models/Sequence');
const PropertyWatchlist = require('../models/PropertyWatchlist');
const FeatureProperties = require('../models/FeatureProperties')
const adminConfig = require('../config/adminConfig.json')
const serverConfig = require('../config/serverConfig.json')

    
// SavedItemId: String,
// publishedOn: Date,
// updatedOn: Date,
// publishedBy: String,
// publisherEmailId: String,
// SavedItemDetails: Object


module.exports.addNewSavedItem = async (req, res) => {
    console.log("addNewSavedItem--", req.body)
    let {formData} = req.body
    try {
        let itemId = await getItemSeqence()
        let savedFormData = {
            SavedItemDetails: formData
        }
        savedFormData['SavedItemId'] = "Item-"+itemId
        savedFormData['isTrash'] = false
        savedFormData['publishedOn'] = new Date()
        savedFormData['updatedOn'] = new Date()
        savedFormData['publishedBy'] = formData.publishedBy
        savedFormData['publisherEmailId'] = formData.publisherEmailId
        const newSavedItem = new SavedItem(savedFormData);
        await newSavedItem.save();
        res.send({ success: true, message: 'Saved Item Added', data: newSavedItem });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}


module.exports.updateSavedItem = async (req, res) => {
    try {
        const updateData = req.body.updateData;
        const itemID = req.body.itemID

        console.log("updateData--", updateData)
        console.log("itemID--", itemID)
          try {
      const updatedDoc = await SavedItem.findOneAndUpdate(
        { SavedItemId: itemID }, // Find by 'username' key
        updateData,
        { new: true } // This option returns the updated document
        );
        // updateSitemap(`${serverConfig.appUrl}/property/${slug}`)

        console.log('Updated Document:', updatedDoc);
        res.send({ success: true, message: 'Item updated successfully', data: updatedDoc });
      } catch (err) {
        console.error('Error updating record:', err);
        res.send({ success: false, message: 'Item updated faled', error: err });
      }
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}

module.exports.findSavedItems = async (req, res) => {
    let query = req.body.query || {}
    let limit = req.body.limit || 0
    try {
      // console.log("query--", req.body)
      SavedItem.find(query).limit(limit).then((post, error)=> {
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

async function getItemSeqence(){
    console.log("inside add new prop")
    const itemSeq = await Sequence.findOneAndUpdate(
        { name: "savedItemIdSequence" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      if(itemSeq){
          return itemSeq.seq
      }
      else{
        return false
      }
}