const { Router }= require('express')
const userRoute = Router()

const multer = require('multer')
const uploadConfig = require('../config/upload') 


const UsersController = require('../controllers/usersController')
const usersController = new UsersController()

const AvatarController = require('../controllers/avatarController')
const avatarController = new AvatarController()

const authenticator = require('../middleware/authenticator')

const upload = multer(uploadConfig.MULTER)


userRoute.post('/', usersController.Create)
userRoute.put('/', authenticator, usersController.Update)
userRoute.patch('/avatar', authenticator, upload.single('avatar') ,avatarController.Update)
userRoute.delete('/', authenticator, usersController.Delete)

module.exports = userRoute