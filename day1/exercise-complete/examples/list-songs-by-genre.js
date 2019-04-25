'use strict'

const SongsDb = require('../')
const genre = process.argv[2] || 'Electronic'

;(async () => {
  try {
    const db = await SongsDb.at()
    const results = await db.listSongsByGenre(genre)
    console.log(JSON.stringify(results, null, 2))
  } catch (err) {
    console.error(err.message)
  }
})()
