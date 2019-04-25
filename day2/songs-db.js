'use strict'

const Sequelize = require('sequelize')
const path = require('path')
const SongModel = require('./models/song')
const GenreModel = require('./models/genre')

class SongsDb {
  constructor (dbFile) {
    this._storage = path.join(__dirname, dbFile)
    this._sequelize = null
    this._song = null
    this._genre = null
  }

  async _init () {
    this._sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: this._storage
    })

    const Song = this._sequelize.define('song', SongModel)
    const Genre = this._sequelize.define('genre', GenreModel)

    Genre.hasMany(Song)
    Song.belongsTo(Genre)

    this._song = Song
    this._genre = Genre
    return this._sequelize.sync()
  }

  async listSongsByArtist (artist) {
    return this._song.findAll({
      where: {
        artist
      }
    })
  }

  async listSongsByArtistAndAlbum (artist, album) {
    return this._song.findAll({
      where: {
        artist,
        album
      }
    })
  }

  async listSongsByGenre (genreName) {
    return this._song.findAll({
      include: [{
        model: this._genre,
        where: {
          name: genreName
        }
      }]
    })
  }

  async findGenreByName (name) {
    return this._genre.findOne({
      where: {
        name
      }
    })
  }

  async createSong ({ artist, album, song }) {
    return this._song.create({ artist, album, song })
  }

  async createGenre ({ name }) {
    return this._genre.create({ name })
  }

  static async at (dbFile = 'songs.db') {
    const db = new SongsDb(dbFile)
    await db._init()
    return db
  }
}

module.exports = SongsDb
