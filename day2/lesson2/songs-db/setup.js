'use-strict'

const { Database } = require('sqlite3')

const fs = require('fs')

const path = require('path')

const dbFile = path.join(__dirname, 'songs.db')

// in a try / catch to avoid blocking the lifecycle when file is not found
try {
  // deletes dbFile
  fs.unlinkSync(dbFile)
} catch (err) {
  // ignore error, which will be thrown if file doesn't exist
}

// creates a new instance of db, from the db file
const db = new Database(dbFile)

// this creates a series of actions
db.serialize(() => {
  // creates genre table
  db.run(`
      CREATE TABLE GENRES (
        id INTEGER PRIMARY KEY,
        name TEXT
      )
    `, done)

  // creates songs table
  db.run(`CREATE TABLE SONGS ( 
        id INTEGER PRIMARY KEY, 
        artist TEXT, 
        album TEXT, 
        song TEXT,
        genre_id INTEGER,
        FOREIGN KEY(genre_id) REFERENCES genres(id)
        )`,
  done)
  const genres = [{
    id: 1,
    name: 'Electronic'
  }, {
    id: 2,
    name: 'Chiptune'
  }]

  const songs = [{
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Bad Flower',
    genreId: 1
  }, {
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Panda',
    genreId: 1
  }, {
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Industrial',
    genreId: 1
  }, {
    artist: 'Bisou',
    album: 'Haumea',
    song: 'Moon Answer',
    genreId: 1
  }, {
    artist: 'Komiku',
    album: `It's time for adventure`,
    song: 'La Citadelle',
    genreId: 2
  }, {
    artist: 'Komiku',
    album: `It's time for adventure`,
    song: 'Bleu',
    genreId: 2
  }]

  const genresSmt = db.prepare('INSERT INTO genres VALUES (?,?)')
  genres.forEach((genre) => {
    console.log('Creating Genre:', JSON.stringify(genre))
    genresSmt.run(genre.id, genre.name)
  })
  genresSmt.finalize()

  const smt = db.prepare('INSERT INTO songs VALUES (?, ?, ?, ?, ?)')
  songs.forEach((song, idx) => {
    console.log('Creating:', JSON.stringify(song))

    // performs the operation, arguments passed into the ? in order
    smt.run(idx, song.artist, song.album, song.song, song.genreId)
  })
  // finalizes the serelize operation
  smt.finalize()
})

// closes DB connection
db.close()

// checks for errors
function done (err) {
  if (err) throw err
}
