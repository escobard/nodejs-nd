'use-strict'

const SongsDB = require('../')

// this is still confusing, may want to expand on it a bit more
// this argument is passed into the function, when ran with node fileName arguMent
const artist = process.argv[2] || 'test artist'
const album = process.argv[3] || 'test album'
const songProperty = process.argv[4] || 'test song'

async function main () {
  try {
    const db = new SongsDB()

    // error handler on error cases
    db.on('error', err => {
      console.error(err.message)
    })

    const song = {
      artist, album, songProperty
    }
    console.log('SONG', song)
    const newSong = await db.createSong(song)
    console.log(JSON.stringify(newSong, null, 2))
  } catch (err) {
    console.error(err.message)
  }
}

main()
