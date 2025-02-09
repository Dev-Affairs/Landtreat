const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const Property = require('../models/Property');
const Sequence = require('../models/Sequence');
const PropertyWatchlist = require('../models/PropertyWatchlist');
const FeatureProperties = require('../models/FeatureProperties')
const adminConfig = require('../config/adminConfig.json')
const serverConfig = require('../config/serverConfig.json')


// const sitemapPath = path.join("G:/Projects/Landtreat/Server", "file.xml");

updateSitemap = async(postUrl) => {
    try {
    const sitemapPath = path.join(serverConfig.sitemap.property.siteMapPath, serverConfig.sitemap.property.fileName);
    console.log("sitemapPath =>>", sitemapPath)
      const xmlData = fs.readFileSync(sitemapPath, 'utf-8');
      const parser = new xml2js.Parser();
      const sitemapData = await parser.parseStringPromise(xmlData);
      const sitemapEntries = sitemapData.sitemapindex.sitemap || [];
      const sitemapEntry = sitemapEntries.find(entry => entry.loc[0] === postUrl);
      if (sitemapEntry) {
        sitemapEntry.lastmod[0] = new Date().toISOString();
        console.log(`Updated <lastmod> for: ${postUrl}`);
      } else {
        console.log(`URL not found in the sitemap: ${postUrl}`);
        const newSitemap = {
          loc: [postUrl],
          lastmod: [new Date().toISOString()]
        };
        sitemapEntries.push(newSitemap);
        console.log(`Added new sitemap entry for: ${postUrl}`);
      }
      const builder = new xml2js.Builder();
      sitemapData.sitemapindex.sitemap = sitemapEntries
      const updatedXml = builder.buildObject(sitemapData);
      fs.writeFileSync(sitemapPath, updatedXml, 'utf-8');
      console.log('Sitemap updated successfully!');
    } catch (err) {
      console.error('Error updating sitemap:', err);
    }
  }

module.exports.addNewProperty = async (req, res) => {
    console.log("addNewProperty--", req.body)
    let {formData, UID} = req.body
    try {
        let user = await User.findOne({ UID });
        const newProperty = new Property(formData);
        let propertyId = await getPropertySeqence()
        console.log("propertyId-- logging property sequence ...", propertyId)
        let newPropertyId;
        if(propertyId) newProperty['propertyId'] = newPropertyId = formData.propertyDetails.city.toLowerCase().split(" ").join("-") + "-" + propertyId;
        if(formData.propertyDetails && formData.propertyDetails.postTags) newProperty['postTags'] = formData.propertyDetails.postTags
        if(formData.propertyDetails && formData.propertyDetails.slug) newProperty['slug'] = formData.propertyDetails.slug

        console.log("newProperty--", newProperty)
        console.log("user--", user)
        if(user.role == 'admin'){
          newProperty['postedBy'] = 'admin'
          newProperty['hasAdminAttended'] = true
          newProperty['approvalStatus'] = "Approved"
          newProperty['formConfig'] = formData.formConfig
        }
        else if(user.role == 'seller'){
          newProperty['postedBy'] = 'seller'
          newProperty['hasAdminAttended'] = false
          newProperty['approvalStatus'] = "Not Approved"
          newProperty['formConfig'] = formData.formConfig
          const userNotification = new Notification({
            title: "Property under review.",
            content: `Dear Seller, Your Ad-Post (${newPropertyId}) has been sent to admin for review, Once it is reviewed and approved it will be successfully listed in our properties list`,
            date: new Date(),
            dateString: new Date().toDateString(),
            readStatus: false,
            notificationTo: [user.email],
            type: "Admin Approval Notification",
            link: `${serverConfig.appUrl}/property?propertyid=${newPropertyId}`
          });

          const adminNotification = new Notification({
            title: "New Property added for review",
            content: `Hello Admin, A new Ad-post has been submited by ${user.firstName + " " + user.lastName} with Id of ${newPropertyId}, and required to be review. Please review the ad-post.`,
            date: new Date(),
            dateString: new Date().toDateString(),
            readStatus: false,
            notificationTo: adminConfig.adminEmails,
            type: "Review Notification",
            link: `${serverConfig.appUrl}/property?propertyid=${newPropertyId}`
          });
          
          userNotification.save();
          adminNotification.save();
        }
        else{
          res.send({ success: false, message: 'Something went wrong'});
        }
        await newProperty.save();
        updateSitemap(`${serverConfig.appUrl}/property/${formData.propertyDetails.slug}`)
        res.send({ success: true, message: 'Property Added successfully', data: newProperty });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}

module.exports.approveProperty = async (req, res) => {
  console.log("addNewProperty--", req.body)
  const propertyId = req.body.propertyId;
  try {
    var propertyData = await Property.findOne({propertyId})
    await Property.findOneAndUpdate(
      {propertyId: propertyId },  // Filter document by userId and userMail
      { $set: { "postedBy": 'admin' , "hasAdminAttended": true , "approvalStatus": "Approved"} }  // Options
    );

    const adminApprovedNotification = new Notification({
      title: "Property Approved.",
      content: `Dear Seller, Your Ad-Post (${propertyData.propertyId}) has been been approved by the admin.`,
      date: new Date(),
      dateString: new Date().toDateString(),
      readStatus: false,
      notificationTo: propertyData.publisherEmailId,
      type: "Property Approve Notification",
      link: `${serverConfig.appUrl}/property?propertyid=${propertyData.propertyId}`
    });

    adminApprovedNotification.save()
    return res.status(200).send({ success: true, message: "Property is approved"});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Error updating property", error: err });
  }
}

module.exports.savePropertyToBookMark = async(req,res) => {
  const {bookmarkFormData, action} = req.body
  
  // console.log(bookmarkFormData.userId,"inside bookmark property ---")
  const userId = bookmarkFormData.userId
  const userEmail = bookmarkFormData.userMail
  const propertyId = bookmarkFormData.propertyId

  console.log(userEmail,propertyId,userId,"testing here right now --")

  if(action == 'add'){
    try {
      const updatedDocument = await PropertyWatchlist.findOneAndUpdate(
        { userId: userId, userMail: userEmail },  // Filter document by userId and userMail
        { $push: { savedProperties: propertyId } },  // Push propertyId to savedProperties array
        { upsert: true, new: true },  // Options
      );
      console.log(updatedDocument);  // This will log the updated document
      return res.status(200).send({ success: true, message: "Property added to watchlist", data: updatedDocument });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ success: false, message: "Error updating watchlist", error: err });
    }
  }
  
  else if(action == 'remove'){
    try {
      const updatedDocument = await PropertyWatchlist.findOneAndUpdate(
        { userId: userId, userMail: userEmail },  // Filter document by userId and userMail
        { $pull: { savedProperties: propertyId } },  // Push propertyId to savedProperties array
        { upsert: true, new: true },  // Options
      );
      console.log(updatedDocument);  // This will log the updated document
      return res.status(200).send({ success: true, message: "Property removed from watchlist", data: updatedDocument });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ success: false, message: "Error updating watchlist", error: err });
    }
  }
}


module.exports.fetchProperties = async (req, res) => {
    let query = req.body.query || {}
    let limit = req.body.limit || 0
    try {
      // console.log("query--", req.body)
        Property.find(query).limit(limit).then((property, error)=> {
          if(error){
            console.log("error---", error)
            res.status(500).send({ success: false, message: error.message });
            return
          }
            // console.log("property ==", property)
            if(property){
                res.send({ success: true, data: property });
            }
            else{
                res.send({ success: false});
            }

        })
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
}

module.exports.fetchUserBookMarks = async (req, res) => {
  let query = req.body.query || {}
  try {
    console.log("query--", req.body)
    PropertyWatchlist.findOne(query).then((propertyData, error)=> {
        if(error){
          console.log("error---", error)
          res.status(500).send({ success: false, message: error.message });
          return
        }
          console.log("propertyData ==", propertyData)
          res.send({ success: true, data: propertyData || {} });
          // if(propertyData){
          // }
          // else{
          //     res.send({ success: false});
          // }

      })
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
}

module.exports.updateFeatureProperty = async (req, res) => {
  console.log("addNewProperty--", req.body)
  const propertyIdList = req.body.propertyIdList;
  try {
    const updatedFeatureProperty = await FeatureProperties.findOneAndUpdate(
      { },  // Filter document by userId and userMail
      { $set: { propertyIdList: propertyIdList , lastUpdated: new Date} },  // Push propertyId to savedProperties array
      { upsert: true, new: true },  // Options
    );
    console.log(updatedFeatureProperty);  // This will log the updated document
    return res.status(200).send({ success: true, message: "Feature Property updated succesfully", data: updatedFeatureProperty });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Error updating feature property", error: err });
  }
}

module.exports.getFeatureProperties = async (req, res) => {
  console.log("addNewProperty--", req.body)
  try {
      let featureProperties = await FeatureProperties.findOne({})
      res.status(200).send({ success: true, data: featureProperties });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
}


module.exports.updateProperty = async (req, res) => {
  console.log("addNewProperty--", req.body)
  try {
      const updateData = req.body.updateData;
      const propertyId = req.body.propertyId
      const slug = req.body.slug
      const patchFormConfig = req.body.patchFormConfig

      console.log("propertyId---------------", patchFormConfig)
        try {
    const updatedDoc = await Property.findOneAndUpdate(
      { propertyId: propertyId }, // Find by 'username' key
      updateData,
      { new: true } // This option returns the updated document
      );
      updateSitemap(`${serverConfig.appUrl}/property/${slug}`)
      if (patchFormConfig != null) {
        const currentProperty = await Property.findOne({propertyId})
        currentProperty['formConfig'] = patchFormConfig

        currentProperty.save()
      } 

      console.log('Updated Document:', updatedDoc);
      res.send({ success: true, message: 'Property updated successfully', data: updatedDoc });
    } catch (err) {
      console.error('Error updating record:', err);
      res.send({ success: false, message: 'Property updated faled', error: err });
    }
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
}


async function getPropertySeqence(){
    console.log("inside add new prop")
    const PropertySeq = await Sequence.findOneAndUpdate(
        { name: "propertyIdSequence" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      if(PropertySeq){
          return PropertySeq.seq
      }
      else{
        return false
      }
}