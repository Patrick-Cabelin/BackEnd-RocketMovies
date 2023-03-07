const SqliteConnection = require('../../sqlite')
const createUserTable = require('./createUsers')


async function MigrationsRun(){
    const schemas = [createUserTable].join('')

    SqliteConnection().then(db =>
        db.exec(schemas))
    .catch(error=> console.error(error))
}


module.exports = MigrationsRun