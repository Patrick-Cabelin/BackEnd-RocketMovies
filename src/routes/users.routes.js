const { Router }= require('express')
const userRoute = Router()

const UserController = require('../controllers/userController')
const userController = new UserController()


userRoute.post('/', userController.Create)

module.exports = userRoute