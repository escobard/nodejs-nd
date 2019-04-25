const SongsDB = require('../songs-db'),
artist = process.argv[2] || 'Komiku'

 ;(async () => {
  try {
    const db = await SongsDB.at()
    const results = await db.listSongsByArtist(artist);
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.log(err.message)
  }
})()