'use-strict'

const path = require('path';)

class SongsDb{
    constructor(dbFile){

        // declaring variables with a _ labels it as a private variable.
        // not yet added to JS, but will be

        // this specifies the file that contains the SQL storage
        this._storage = path.join(__dirname, dbFile);
        this._sequelize = null;
        this._song = null;
    }

    // async not supported with constructor file yet 
    async _init(){

        // creates a new sequelize instance
        this._sequelize = new Sequelize({

            // establishes the DB language, in this case sqlite
            dialect: 'sqlite',
        })
    }
}

module.exports = SongsDb