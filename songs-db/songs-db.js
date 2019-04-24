'use-strict'

const path = require('path'), 
sequelize = require('sequelize'),
SongModel = require('./models/song')

class SongsDb{
    constructor(dbFile){

        // declaring variables with a _ labels it as a private variable.
        // not yet added to JS, but will be

        // this specifies the file that contains the SQL storage
        this._storage = path.join(__dirname, dbFile);

        // contains the sequelize instance
        this._sequelize = null;

        // contains the song model
        this._song = null;
    }

    // async not supported with constructor file yet 
    async _init(){

        // creates a new sequelize instance
        this._sequelize = new Sequelize({

            // establishes the DB language, in this case sqlite
            dialect: 'sqlite',

            // sets the file / URL for the instance
            storage: this_storage
        })
        
        // defines the model from the file
        const Song = this_sequelize.define('song', SongsModel);
        
        // sets the new 'song' model to a .this method
        this._song = Song

        // not qite sure what .sync is, but basically returns the new sequelize instance
        // with established configurations
        return this._sequelize.sync();
    }

    static async(dbFile = 'songs.db'){
        const db = new SongsDb(dbFile)
        await db._init()
        return db
    }
}

module.exports = SongsDb