const Spotify = require('./lib/spotify')
const Youtube = require('./lib/youtube')

export class MusicBox {
  constructor (options) {
    if (options.spotify) {
      this.spotify = new Spotify(options.spotify)
    }
    if (options.youTube) {
      this.youTube = new Youtube(options.youTube)
    }
  }

  search (query) {
    return new Promise((resolve, reject) => {
      if (!this.spotify) return reject(new Error('Missing Spotify connection'))
      this.spotify.search(query).then(resolve)
    })
  }

  getArtistDetail(artist, country) {
    if (!this.youTube) throw new Error('Missing YouTube connection')
    return Promise.all([
      this.spotify.searchTopTracks(artist.id, country),
      this.spotify.searchRelatedArtists(artist.id),
      this.youTube.search(artist.name)
    ]).then(([topTracks, relatedArtists, videos]) => {
      return {
        topTracks,
        relatedArtists,
        videos
      }
    })
  }
}

export default MusicBox
