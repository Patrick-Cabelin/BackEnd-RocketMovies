const sql3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path')


async function SqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, '..', 'database.db'),
        driver: sql3.Database
    })
    
    return database
}


module.exports = SqliteConnection