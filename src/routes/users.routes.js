const { Router }= require('express')
const userRoute = Router()

const UsersController = require('../controllers/usersController')
const usersController = new UsersController()


userRoute.post('/', usersController.Create)
userRoute.put('/:user_id', usersController.Update)
userRoute.delete('/:user_id', usersController.Delete)

module.exports = userRoute