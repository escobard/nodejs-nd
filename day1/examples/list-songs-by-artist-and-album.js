const SongsDB = require('../songs-db'),
artist = process.argv[2] || 'Bisou',
album = process.argv[2] || 'Moon Answer'

 ;(async () => {
  try {

    // calls DB instance
    const db = await SongsDB.at()
    // query result
    const results = await db.listSongsByArtistAndAlbum(artist, album);
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.log(err.message)
  }
})()