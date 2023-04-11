const AppError = require('../utils/AppError')
const {verify} = require('jsonwebtoken')
const authConfig = require('../config/auth')

function Authenticator(request, response, next){
    const authHeader = request.headers.authorization

    if(!authHeader) throw new AppError('JWT TOKEN inválido', 401)

    const [, token] = authHeader.split(' ')

    try{
        const {sub: user_id} = verify(token, authConfig.secret)

        request.user = {
            id: Number(user_id)
        }

        next()
    } catch{ throw new AppError('JWT TOKEN inválido', 401) }

}

module.exports = Authenticator