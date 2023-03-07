const {hash , compare} = require('bcryptjs')
const sqlConnection= require('../database/sqlite')
const AppError = require('../utils/AppError.js')
class UserController{
    async Create(request, response){
        const database = await sqlConnection()

        const {name, email, password} = request.body
        const passwordEncrypted = await hash(password,8) 
        
        const userExist = await database.get('SELECT email FROM users WHERE email = ?', [email])
        
        if (userExist) throw new AppError('Usuario Já em uso, tente outro!')
                
        await database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, passwordEncrypted])
        
        response.json()
    }

    async Update(request, response){
        const database = await sqlConnection()

        const {name, email, password, old_password} = request.body
        const {user_id}= request.params
      
        const user = await database.get('SELECT * FROM users WHERE id = ?',[user_id])
        const newEmailOfUser = await database.get('SELECT * FROM users WHERE email = ?',[email])
        
        if(!user) throw new AppError('Usuário não existe')

        if(newEmailOfUser && newEmailOfUser.id != user.id) throw new AppError('Email já em uso, Tente outro!')
        
        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password) throw new AppError('Digite a senha para a mudança')

        if(password && old_password){
            const old_passwordMatch = await compare(old_password, user.password)
            if(old_passwordMatch) throw AppError('Senha Antiga incorreta')
           
            user.password = await hash(password, 8)
        }
            
            

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('NOW')
            WHERE id  = ?
        `, [user.name, user.email, user.password, user_id]);
        return response.json()
    }
}

module.exports = UserController