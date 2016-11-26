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
    return this.spotifyApi.searchArtists(query)
    // .then(function(data) {
    //   console.log('Search artists by "Love"', data.body);
    // }, function(err) {
    //   console.error(err);
    // });

  }
}