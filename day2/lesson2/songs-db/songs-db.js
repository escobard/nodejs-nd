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

    // returns a list of the records
    async _list(){}

    // used to insert into the records
    async _insert(){
        return new Promise((resolve, reject) =>{
            
            // onComplete callback needs to be anormal function
            function onComplete(err){
                // if err exists, reject original promise
                if (err) return reject(err)
                
                // .this here refers to the onComplete function, lastID is the last ID of the inserted sqlite value
                const lastID = this.lastID
                resolve({ id: lastID })
            }

            // runs a query within the DB with .run
            // first argument query type
            // second argument parameters for the query
            // third argument is callback
            this.db.run(query, params, onComplete)
        })
    }
}

module.exports = SongsDb;