'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpotifyWebApi = require('spotify-web-api-node');

var Spotify = function () {
  function Spotify(options) {
    _classCallCheck(this, Spotify);

    this.spotifyApi = new SpotifyWebApi({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      redirectUri: options.redirectUri
    });

    if (options.accessToken) this.spotifyApi.setAccessToken(options.accessToken);
  }

  _createClass(Spotify, [{
    key: 'search',
    value: function search(query) {
      var _this = this;

      if (this.spotifyApi) {
        return this.spotifyApi.searchArtists(query).then(function (response) {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            if (response.body) {
              if (response.body.artists) {
                return _this.readArtists(response);
              } else {
                console.log(response);
              }
            } else {
              console.log(response);
              throw "revisar";
            }
          }
        });
      }
      return new Promise(function (_, reject) {
        reject(new Error('Missing Spotify Connection'));
      });
      // .then(function(data) {
      //   console.log('Search artists by "Love"', data.body);
      // }, function(err) {
      //   console.error(err);
      // });
    }
  }, {
    key: 'readArtists',
    value: function readArtists(data) {
      if (data.body.artists && data.body.artists.items) {
        return data.body.artists.items.map(function (artist) {
          return {
            id: artist.id,
            name: artist.name,
            href: artist.href,
            followers: artist.followers.total,
            genres: artist.genres,
            popularity: artist.popularity,
            images: artist.images
          };
        });
      }
    }
  }]);

  return Spotify;
}();

exports.default = Spotify;
module.exports = exports['default'];