'use-strict'

const { EventEmitter } = require('events'),
{ Database } = require('sqlite3'),
path = require('path');

// extending this class here adds the event emmiter to the class, which allows us to use .emit
class SongsDb extends EventEmitter{
    // this sets the dbFile variable to the DB file created by sqlite
    constructor(dbFile = 'songs.db'){
        super()
        // creates a DB from the file w/ sqlite3
        this.db = new Database(path.join(__dirname, dbFile))

        // if there is an error, throw error
        this.db.on('error', () =>{
            this.emit('error', err)
        })
    }
}

module.exports = SongsDb;