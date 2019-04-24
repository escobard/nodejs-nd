'use-strict'

const path = require('path'), 
Sequelize = require('sequelize'),
SongsModel = require('./models/song')

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
            storage: this._storage
        })
        
        // defines the model from the file
        const Song = this._sequelize.define('song', SongsModel);
        
        // sets the new 'song' model to a .this method
        this._song = Song;

        // not qite sure what .sync is, but basically returns the new sequelize instance
        // with established configurations

        // .sync() is necessary when defining the MODELS with sequelize
        return this._sequelize.sync();
    }

    // this is a base query syntax
    async listSongsByArtist(artist){

        // using findAll query
        return this._song.findAll({

            // where the property name is artist, and the value is the argument
            where: {

                // using es6 sugared syntax
                artist
            }
        })
    }

    async listSongsByArtistAndAlbum(artist, album){
        return this._song.findAll({
            where: {
                artist, 
                album
            }
        })
    }

    // this is the base syntax to create a new COLUMN in the specified table
    async createSong({artist, album, song}){
        return this._song.create({
            artist,
            album,
            song
        })
    }

    // allows you to create an INSTANCE of a class, with this new static function
    // for example - let db = new SongsDB.at('dbFile');
    static async at (dbFile = 'songs.db'){
        const db = new SongsDb(dbFile)
        await db._init()
        return db
    }
}

module.exports = SongsDb