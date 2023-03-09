const { Router }= require('express')
const moviesRoute = Router()

const MoviesController = require('../controllers/MoviesController')
const moviesController = new MoviesController()

moviesRoute.get('/', moviesController.Index)
moviesRoute.get('/:id', moviesController.Show)
moviesRoute.post('/:user_id', moviesController.Create)
moviesRoute.delete('/:id', moviesController.Delete)

module.exports = moviesRoute