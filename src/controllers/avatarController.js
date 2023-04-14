const knex = require('knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/diskStorage')

class AvatarController{
    async Update(request , response){
        console.log('af')
        const diskstorage = new DiskStorage()
        const user_id = request.user.id
        const avatarFileName = request.file.filename

        const user = await knex('user').where({id : user_id}).first()
        if(!user) throw AppError('Ação não autorizada',401)

        if (user.avatar) await diskstorage.deleteFile(user.avatar)

        const filename = await diskstorage.saveFile(avatarFileName)
        user.avatar = filename
         
        await knex('users').update(user).where({id : user})

        return response.json(user)
    }
}

module.exports = AvatarController