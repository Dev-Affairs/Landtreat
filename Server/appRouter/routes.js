const appRouter = require("express").Router()
const multer = require('multer');
const commonServiceController = require("../controllers/commonServiceController")
const propertyServiceController = require("../controllers/propertyServiceController")
const postServiceController = require("../controllers/postServiceController")
const savedItemServiceController = require("../controllers/savedItemServiceController")
const authServiceController = require("../controllers/authServiceController")
const userServiceController = require("../controllers/userServiceController")
const {sendOTP, verifyOTP} = require("../controllers/nodeMailerController")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // File upload destination
    },
    filename: function(req, file, cb) {
        console.log("file--", file)
        const extension = file.originalname.split(".").pop();
        cb(null, "IMG" + '-' + Date.now() + '.' + extension);
    }
});


const upload = multer({ storage: storage });
const cn_storage = multer.memoryStorage();
const cn_upload = multer({ storage: cn_storage });


appRouter.post("/native-upload",upload.single('file'), commonServiceController.uploadFilesToServer)
appRouter.post("/cn_upload",cn_upload.single('file'), commonServiceController.uploadFilesToCloudyNary)
appRouter.post("/getYT-video-title", commonServiceController.getYoutubeVideoTitle)
appRouter.post("/verifyUser",authServiceController.verifyUser)
appRouter.post("/generate-otp",sendOTP)
appRouter.post("/verify-otp",verifyOTP)
appRouter.post("/create-enquiry",commonServiceController.createEnquiry)
appRouter.post("/fetch-enquiries",commonServiceController.fetchEnquiries)

appRouter.post("/add-property", propertyServiceController.addNewProperty)
appRouter.post("/update-property", propertyServiceController.updateProperty)
appRouter.post("/find-properties", propertyServiceController.fetchProperties)
appRouter.post("/getUserBookmarks", propertyServiceController.fetchUserBookMarks)
appRouter.post("/approve-property", propertyServiceController.approveProperty)

appRouter.post("/add-post", postServiceController.addNewPost)
appRouter.post("/update-post", postServiceController.updatePost)
appRouter.post("/find-post", postServiceController.findPosts)



appRouter.post("/property-watchlist", propertyServiceController.savePropertyToBookMark)
appRouter.post("/update-feature-properties", propertyServiceController.updateFeatureProperty)
appRouter.post("/get-feature-properties", propertyServiceController.getFeatureProperties)

appRouter.post("/auth/signup", authServiceController.signUpUser)
appRouter.post("/auth/login", authServiceController.login)
appRouter.post("/auth/reset-password",authServiceController.forgotPassword)
appRouter.post("/auth/updateUserRole",authServiceController.updateUserRole)

appRouter.post("/getNotifications",commonServiceController.fetchNotifications)
appRouter.post("/getNotificationCount",commonServiceController.fetchNotificationCount)
appRouter.post("/markAsRead",commonServiceController.markAsRead)
appRouter.post('/session-logs',commonServiceController.sessionLogs)

appRouter.post("/update-app-config",commonServiceController.updateAppConfig)
appRouter.post("/find-app-config",commonServiceController.fetchAppConfig)


appRouter.post("/fetch-saved-item",savedItemServiceController.findSavedItems)
appRouter.post("/add-saved-item",savedItemServiceController.addNewSavedItem)
appRouter.post("/update-saved-item",savedItemServiceController.updateSavedItem)


module.exports = {appRouter}
 