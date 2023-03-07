const {hash , compare} = require('bcryptjs')
const database= require('../database/sqlite')
class UserController{
    async Create(request, response){
        const {name, email, password} = request.body
        const userExist = await database.get('SELECT ')
        const passwordEncrypted = hash(password,8) 
        response.json({name, email, password})
    }
}

module.exports = UserController