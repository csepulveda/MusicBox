const config = require('config')
const {MusicBox} = require('../lib')

const options = {}

if (config.has('spotify'))
  options.spotify = config.get('spotify')

const musicBox = new MusicBox(options)
musicBox.search('Led Zeppelin')
