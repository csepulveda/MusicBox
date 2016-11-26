const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const config = require('config')
const path = require('path')
const { MusicBox } = require('../lib')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(express.static(path.join(__dirname, 'dist')))

const port = process.env.PORT || 8085

server.listen(port, () => {
  console.log(`Listening in port ${port}.`)
})

const options = {}
if (config.has('spotify'))
  options.spotify = config.get('spotify')

if (config.has('youTube'))
  options.youTube = config.get('youTube')

const musicBox = new MusicBox(options)

io.on('connection', (socket) => {
  console.log('Received new socket connection.')
  socket.on('query', (query) => {
    console.log(query)
    musicBox.search(query)
      .then((artists) => {
        if (artists.length) {
          const artist = artists[0]
          socket.emit('artist', artist)
          musicBox.getArtistDetail(artist, 'CL').then((data) => {
            socket.emit('data', data)
          })
        }
      })
      .catch((err) => socket.emit('error', err))
  })
})