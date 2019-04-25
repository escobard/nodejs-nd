'use-strict'

const SongsDB = require('../')

// this is still confusing, may want to expand on it a bit more
// this argument is passed into the function, when ran with node fileName arguMent
const artist = process.argv[2] || 'Bisou'
const album = process.argv[3] || 'Haumea'

async function main () {
  try {
    const db = new SongsDB()

    // error handler on error cases
    db.on('error', err => {
      console.error(err.message)
    })

    const results = await db.listSongByArtistAndAlbum(artist, album)
    console.log(JSON.stringify(results, null, 2))
  } catch (err) {
    console.error(err.message)
  }
}

main()
