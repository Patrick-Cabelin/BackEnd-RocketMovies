const knex = require('../database/knex');
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')
const {compare} = require('bcryptjs')
const {sign} = require('jsonwebtoken')

class AuthController{
    async Create(request,response){
        const {email, password} = request.body
       
        const user = await knex('users').where({email}).first()
        
        if(!user) throw new AppError('Informações incorretas')
        
        const passwordRight = await compare(password, user.password)
        
        
        if(!passwordRight) throw new AppError('Informações incorretas')
        
        const {expiresIn,secret} = authConfig
        const token = await sign({},secret, {
            subject: String(user.id),
            expiresIn
        })
        return response.json({user, token})
    }
}

module.exports = AuthController