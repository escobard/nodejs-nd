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
      const genres = [{
        name: 'Electronic'
      }, {
        name: 'Chiptune'
      }]
      
      for (let genre of genres){
        await db.createSong(genre)
      }

      const songs = [{
        artist: 'Bisou',
        album: 'Music Spaceshift',
        song: 'Bad Flower',
        genreName: 'Electronic'
      }, {
        artist: 'Bisou',
        album: 'Music Spaceshift',
        song: 'Panda',
        genreName: 'Electronic'
      }, {
        artist: 'Bisou',
        album: 'Music Spaceshift',
        song: 'Industrial',
        genreName: 'Electronic'
      }, {
        artist: 'Bisou',
        album: 'Haumea',
        song: 'Moon Answer',
        genreName: 'Electronic'
      }, {
        artist: 'Komiku',
        album: `It's time for adventure`,
        song: 'La Citadelle',
        genreName: 'Chiptune'
      }, {
        artist: 'Komiku',
        album: `It's time for adventure`,
        song: 'Bleu',
        genreName: 'Chiptune'
      }]
  
       for (let song of songs) {
        const genre = await db.findGenreByName(song.genreName)
        const savedSong = await db.createSong(song);

        // setGenre is an automatic association done by sequelize
        // can only use this due to the association we set
        savedSong.setGenre(genre);
      }
    } catch (err) {
      console.log(err.message)
    }
  })()