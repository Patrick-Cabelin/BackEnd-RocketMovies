const MigrationsRun = require('./database/sqlite/migrations')
MigrationsRun()

const express = require('express')
app = express()
app.use(express.json())

const routes = require('./routes')
app.use(routes)

const PORT = 3000
app.listen(PORT, ()=>console.log(`Servidor em Funcionamento na porta: ${PORT}`))