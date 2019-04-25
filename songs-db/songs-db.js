'use-strict'

const path = require('path'), 
Sequelize = require('sequelize'),
SongsModel = require('./models/song'),
GenreModel = require('./models/genre')

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
        this._genre = null;
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
        const Genre = this._sequelize.define('genre', GenreModel);
        
        // determines relationship between genre and song
        
        // says Genre has many songs
        Genre.hasMany(Song);

        // says song belongs to genre
        Song.belongsTo(Genre);
        
        // sets the new 'song' model to a .this method
        this._song = Song;
        this._genre = Genre;

        // not qite sure what .sync is, but basically returns the new sequelize instance
        // with established configurations

        // .sync() is necessary when defining the MODELS with sequelize
        return this._sequelize.sync();
    }

    async listSongsByGenre (genreName){
        return this._song.findAll({

            // the include syntax, is an SQL join
            include : [{

                // finds by the model
                model: this._genre,

                // where the genre has genre name
                where: {
                    name: genreName
                }
            }]
        })
    }

    // finds a single genre
    async findGenreByName (name){
        console.log('NAME GENRE', name)
        return this._genre.findOne({
            where: {
                name: name
            }
        })
    }

    async createGenre({name}){
        console.log('NAME', name)
        return this._genre.create({
            name
        })
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