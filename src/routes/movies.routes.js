const { Router }= require('express')
const moviesRoute = Router()

const authenticator = require('../middleware/authenticator')
const MoviesController = require('../controllers/MoviesController')
const moviesController = new MoviesController()

moviesRoute.use(authenticator)

moviesRoute.get('/', moviesController.Index)
moviesRoute.get('/:id', moviesController.Show)
moviesRoute.post('/', moviesController.Create)
moviesRoute.delete('/:id', moviesController.Delete)

module.exports = moviesRoute