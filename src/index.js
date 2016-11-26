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
      this.searchSpotify(query).then(resolve)
    })
  }

  getArtistDetail(id, country) {
    this.spotify.searchTopTracks(id, country)
    this.spotify.searchRelatedArtists(id).then(console.log)
  }

  searchSpotify (query) {
    return this.spotify.search(query)
  }
}

export default MusicBox
