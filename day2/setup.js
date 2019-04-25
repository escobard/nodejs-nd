'use strict'

const SongsDb = require('./')
const fs = require('fs')
const path = require('path')
const dbFile = path.join(__dirname, 'songs.db')

// Delete db file
try {
  fs.unlinkSync(dbFile)
} catch (err) {
  // Ignore
}

;(async () => {
  const db = await SongsDb.at('songs.db')
  try {
    const genres = [{
      name: 'Electronic'
    }, {
      name: 'Chiptune'
    }]

    for (let genre of genres) {
      await db.createGenre(genre)
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

    for (let s of songs) {
      const genre = await db.findGenreByName(s.genreName)
      const song = await db.createSong(s)
      song.setGenre(genre)
    }
  } catch (err) {
    console.log(err.message)
  }
})()
