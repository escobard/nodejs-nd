'use-strict'

// by using sqlite - uses a file in your local host that is used to generate the DB
const SongsDb = require('./songs-db'),
fs = require('fs'),
path = require('path'),
dbFile = path.join(__dirname, 'songs.db')

// uses our try / catch to catch async errors
try{

    // checks if DB file exists 
    fs.unlinkSync(dbFile)
}
catch(err){

}

;(async () => {
    const db = await SongsDb.at('songs.db')
    try {
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
  
       for (let song of songs) {
        await db.createSong(song)
      }
    } catch (err) {
      console.log(err.message)
    }
  })()