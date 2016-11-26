'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spotify = require('./lib/spotify');

var MusicBox = exports.MusicBox = function () {
  function MusicBox(options) {
    _classCallCheck(this, MusicBox);

    if (options.spotify) {
      this.spotify = new Spotify(options.spotify);
    }
  }

  _createClass(MusicBox, [{
    key: 'search',
    value: function search(query) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.spotify) return reject(new Error('Missing Spotify Connection'));
        _this.searchSpotify(query).then(resolve);
      });
    }
  }, {
    key: 'getArtistDetail',
    value: function getArtistDetail(id, country) {
      this.spotify.searchTopTracks(id, country);
      this.spotify.searchRelatedArtists(id).then(console.log);
    }
  }, {
    key: 'searchSpotify',
    value: function searchSpotify(query) {
      return this.spotify.search(query);
    }
  }]);

  return MusicBox;
}();

exports.default = MusicBox;