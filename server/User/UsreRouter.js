const express = require("express")
const userController = require("./UserController")

const UserRouter = express.Router()

// UserRouter.post("/register", userController.userRegister)/
// UserRouter.post("/user", userController.InsertUser)
UserRouter.post("/user/login", userController.userLogin)
UserRouter.post("/user/register", userController.userRegister)





module.exports = UserRouter