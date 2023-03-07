require('express-async-errors')
const MigrationsRun = require('./database/sqlite/migrations')
MigrationsRun()

const express = require('express')
app = express()
app.use(express.json())

const routes = require('./routes')
app.use(routes)

const AppError = require('./utils/AppError')

const responseError = (error, request, response, next) => {
    
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            error: error.message,
            status: 'error'
        })
    }

    console.error(error)


    return response.status(500).json({
        message: 'Error interno do servidor',
        status: 'error'
    }) 
}

app.use(responseError)

const PORT = 3000
app.listen(PORT, ()=>console.log(`Servidor em Funcionamento na porta: ${PORT}`))