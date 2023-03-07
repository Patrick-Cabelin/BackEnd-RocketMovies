const { Router }= require('express')
const routes = Router()

const usersRoutes =require('./users.routes')
// const tagsRoutes =require('./tags.routes')
// const moviesRoutes =require('./movies.routes')

routes.use('/user',usersRoutes)
// routes.use('/tags',tagsRoute)
// routes.use('/movies',moviesRoute)

module.exports = routes