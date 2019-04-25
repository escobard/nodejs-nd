'use-strict'

const { Database } = require('sqlite3'),
fs = require('fs'),
path = require('path'),
dbFile = path.join(__dirname, 'songs.db');

// in a try / catch to avoid blocking the lifecycle when file is not found
try {
    // deletes dbFile
    fs.unlinkSync(dbFile)
} catch(err){   
    // ignore error, which will be thrown if file doesn't exist
}

// creates a new instance of db, from the db file
const db = new Database(dbFile)

// this creates a series of actions
db.serialize(() =>{
    db.run(`CREATE TABLE SONGS ( 
        id INTEGER PRIMARY KEY, 
        artist TEXT, 
        album TEXT, 
        song TEXT)`,
        done())

        const songs = [{
            artist: 'Bisou',
            album: 'Music Spaceshift',
            song: 'Bad Flower'
          }, {
            artist: 'Bisou',
            album: 'Music Spaceshift',
            song: 'Panda'
          }, {
            artist: 'Bisou',
            album: 'Music Spaceshift',
            song: 'Industrial'
          }, {
            artist: 'Bisou',
            album: 'Haumea',
            song: 'Moon Answer'
          }, {
            artist: 'Komiku',
            album: `It's time for adventure`,
            song: 'La Citadelle'
          }, {
            artist: 'Komiku',
            album: `It's time for adventure`,
            song: 'Bleu'
          }]

          const smt = db.prepare('INSERT INTO songs VALUES (?, ?, ?, ?)')
          songs.forEach((song, idx) =>{
              console.log('Creating:', JSON.stringify(song))
              
              // performs the operation, arguments passed into the ? in order
              smt.run(idx, song.artist, song.album, song.song)
          })
          // finalizes the serelize operation
          smt.finalize()
})

// closes DB connection
db.close()

// checks for errors
function done(err){
  if(err) throw err
}