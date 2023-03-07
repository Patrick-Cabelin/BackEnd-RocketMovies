const { Router }= require('express')
const moviesRoute = Router()



moviesRoute.get('/', moviesController.create)

module.exports = moviesRoute