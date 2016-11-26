const Spotify = require('./lib/spotify')

export class MusicBox {
  constructor (options) {
    if (options.spotify) {
      this.spotify = new Spotify(options.spotify)
    }
  }

  search (query) {
    return new Promise((resolve, reject) => {
      if (!this.spotify) return reject(new Error('Missing Spotify Connection'))
      resolve(this.searchSpotify(query))
    })
  }

  searchSpotify (query) {
    return this.spotify.search(query).then(this.log)
  }

  log (data) {
    console.log(JSON.stringify(data, null, 4))
  }
}

export default MusicBox