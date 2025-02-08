const appRouter = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const axios = require("axios");
const serviceConfig = require("../config/serviceConfig.json");
const Notification = require("../models/Notification");
const AppConfig = require("../models/AppConfigs");
const Enquiry = require("../models/enquiries");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // File upload destination
  },
  filename: function (req, file, cb) {
    console.log("file--", file);
    const extension = file.originalname.split(".").pop();
    cb(null, "IMG" + "-" + Date.now() + "." + extension);
  },
});

cloudinary.config({
  cloud_name: serviceConfig.cloudinary.cloud_name,
  api_key: serviceConfig.cloudinary.api_key,
  api_secret: serviceConfig.cloudinary.api_secret,
});

const cloudynaryUploadFoldername = serviceConfig.cloudinary.uploadFolderName;

module.exports.uploadFilesToServer = async (req, res) => {
  console.log("upload ---");
  try {
    res.send({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.send({ message: "File uploaded failed" });
  }
};

module.exports.sessionLogs = async(req,res) => {
  try {
    console.log(req.body,"inside session logs --")
    res.status(200).json({success:true,message:"server responded with status 200"})
  } catch (error) {
    res.status(500).send({ success: false });
  }
}

module.exports.uploadFilesToCloudyNary = async (req, res) => {
  try {
    const file = req.file;
    const totalBytes = file.size;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    var cloudinaryResult;
    var isReponseAvailable = false;
    var isErrorUploading = false;
    var errorMessage = "";
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: cloudynaryUploadFoldername },
      (error, result) => {
        isReponseAvailable = true;
        if (error) {
          console.log("error while upload--0", error);
          isErrorUploading = true;
          errorMessage = error.message;
          return res.send({ success: false, message: errorMessage });
        }
        console.log("respnse from cn--", result);
        cloudinaryResult = result;
        return res.send({
          success: true,
          message: "Successful",
          result: result,
        });
      }
    );

    const fileReaderStream = streamifier.createReadStream(file.buffer);
    let bytesUploaded = 0;

    fileReaderStream.on("data", (chunk) => {
      bytesUploaded += chunk.length;
      console.log(`Uploaded ${bytesUploaded} of ${totalBytes}`);
      console.log("progress ==", (bytesUploaded / totalBytes) * 100);
    });

    fileReaderStream.pipe(uploadStream);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "File uploaded failed", error: error });
  }
};

module.exports.createEnquiry = async (req, res) => {
  try {
    const { email, propertyId, fullName, phone, description,propertyImage,propertyTitle } = req.body;

    console.log(
      email,
      propertyId,
      fullName,
      phone,
      description,
      "testing enquiry --"
    );

    const enquiry = new Enquiry({
      email,
      propertyId,
      fullName,
      phone,
      description,
      propertyImage,
      propertyTitle,
      date: new Date(),
      dateString: new Date().toDateString(),
      readStatus: false,
    });

    enquiry.save()

    res.status(200).send({ success: true, message: "server is ok" });
  } catch (error) {
    res.send({ message: "File uploaded failed", success: false });
  }
};

module.exports.fetchEnquiries = async(req,res) => {
  let query = req.body.query || {};
  let limit = req.body.limit || 0;
  try {
    Enquiry.find(query).limit(limit).then((enquiries,error) => {
      if (error) {
        console.log("error---", error);
        res.status(500).send({ success: false, message: error.message });
        return;
      }
      if (enquiries) {
        res.send({ success: true, data: enquiries });
      } else {
        res.send({ success: false });
      }
    })
  } catch (error) {
    res.send({ message: "File uploaded failed", success: false });
  }
}

module.exports.markAsRead = async (req,res) => {
  try {
    console.log(req.body,"probably here --")
    res.status(200).json({success:true,msg:"server responded with code 200"})
  } catch (error) {
    res.send({ message: "File uploaded failed", success: false });
  }
}

module.exports.getYoutubeVideoTitle = async (req, res) => {
  let videoUrl = req.body.videoUrl;
  let videoId = req.body.videoId;
  console.log("videoId--", videoId);
  try {
    const params = {
      part: "snippet",
      id: videoId,
      key: serviceConfig.youtube.YOUTUBE_API_KEY,
    };

    const response = await axios.get(serviceConfig.youtube.YOUTUBE_API_URL, {
      params,
    });
    if (response.data && response.data.items && response.data.items.length) {
      const videoTitle = response.data.items[0].snippet.title;
      res.send({ success: true, videoTitle: videoTitle, isValid: true });
    } else {
      res.send({ success: true, isValid: false });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "File uploaded failed", success: false });
  }
};

module.exports.fetchNotifications = async (req, res) => {
  let query = req.body.query || {};
  let limit = req.body.limit || 0;
  try {
    // console.log("query--", req.body);
    Notification.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .then((notifications, error) => {
        if (error) {
          console.log("error---", error);
          res.status(500).send({ success: false, message: error.message });
          return;
        }
        console.log("notifications ==", notifications);
        if (notifications) {
          res.send({ success: true, data: notifications });
        } else {
          res.send({ success: false });
        }
      });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports.fetchNotificationCount = async (req, res) => {
  let query = req.body.query || {};
  try {
    // console.log("query--", req.body);
    Notification.countDocuments(query)
      .then((count) => {
        console.log("count:", count);
        res.send({ success: true, count: count });
      })
      .catch((err) => {
        console.error("Error counting documents:", err);
      });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports.updateAppConfig = async (req, res) => {
  let id = req.body.id
  let updateData = req.body.updateData
  try {
    // console.log("query--", req.body);
    const updatedDoc = await AppConfig.findOneAndUpdate(
          { id }, // Find by 'username' key
          updateData,
          { new: true } // This option returns the updated document
          );
      res.send({ success: true, message: 'Config updated sucessfully', data: updatedDoc });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports.fetchAppConfig = async (req, res) => {
  let id = req.body.id
  try {
    // console.log("query--", req.body);
    const configData = await AppConfig.findOne({ id });
      res.send({ success: true, data: configData });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};