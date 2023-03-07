const { Router }= require('express')
const userRoute = Router()

const UserController = require('../controllers/userController')
const userController = new UserController()


userRoute.post('/', userController.Create)
userRoute.put('/:user_id', userController.Update)

module.exports = userRoute