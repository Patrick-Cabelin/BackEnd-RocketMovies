const { Router }= require('express')
const tagsRoute = Router()

const TagsController = require('../controllers/tagsController')
const tagsController = new TagsController()


tagsRoute.get('/:user_id', tagsController.Show)

module.exports = tagsRoute