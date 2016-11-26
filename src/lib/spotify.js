const SpotifyWebApi = require('spotify-web-api-node')

export default class Spotify {
  constructor (options) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      redirectUri: options.redirectUri
    })

    if (options.accessToken) this.spotifyApi.setAccessToken(options.accessToken)
  }

  search (query) {
    if (this.spotifyApi) {
      return this.spotifyApi.searchArtists(query).then((response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          if (response.body) {
            if (response.body.artists) {
              return this.readArtists(response)
            } else {
              console.log(response)
            }
          } else {
            console.log(response)
            throw "revisar"
          }
        }
      })
    }
    return new Promise((_, reject) => {
      reject(new Error('Missing Spotify Connection'))
    })
  }

  searchTopTracks (id, country) {
    return this.spotifyApi.getArtistTopTracks(id, country).then((response) => {
      return this.readTracks(response)
    })
  }

  searchRelatedArtists (id) {
    return this.spotifyApi.getArtistRelatedArtists(id).then((response) => {
      return this.readArtists(response)
    })
  }

  readArtists (data) {
    const artists = Array.isArray(data.body.artists) ? data.body.artists : data.body.artists.items
    if (artists) {
      return artists.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          href: artist.href,
          followers: artist.followers.total,
          genres: artist.genres,
          popularity: artist.popularity,
          images: artist.images
        }
      })
    } else {
      return []
    }
  }

  readTracks (data) {
    const tracks = data.body.tracks
    if (tracks) {
      return tracks.map((track) => {
        return {
          id: track.id,
          name: track.name,
          duration: track.duration_ms,
          album: {
            id: track.album.id,
            name: track.album.name,
            images: track.album.images,
            type: track.album.type,
            uri: track.album.uri
          },
          popularity: track.popularity,
          preview: track.preview_url,
          uri: track.uri,
          discNumber: track.disc_number,
          trackNumber: track.track_number,
          externals: track.external_urls
        }
      })
    } else {
      return []
    }
  }
}
