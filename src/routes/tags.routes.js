const { Router }= require('express')
const tagsRoute = Router()



tagsRoute.get('/', tagsController.create)

module.exports = tagsRoute