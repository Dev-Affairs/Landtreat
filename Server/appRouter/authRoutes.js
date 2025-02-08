const authRouter = require("express").Router()

authRouter.post("/find-properties", propertyServiceController.fetchProperties)


module.exports = {authRouter}
