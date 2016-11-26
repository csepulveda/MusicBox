const config = require('config')
const {MusicBox} = require('../lib')

const options = {}

if (config.has('spotify'))
  options.spotify = config.get('spotify')

const musicBox = new MusicBox(options)
musicBox.search('Andromeda')
.then((data) => {
  if (data.length) {
    musicBox.getArtistDetail(data[0].id, 'CL').then(console.log)
  }
})
.catch(console.log)
