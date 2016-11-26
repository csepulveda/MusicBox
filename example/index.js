import React from 'react'
import { render } from 'react-dom'
import 'isomorphic-fetch'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.socket = io.connect()
    this.artists = ['Pink Floyd', 'Black Sabbath', 'Led Zeppelin']
    this.index = 0
  }

  loadArtistData() {
    if (this.artists[this.index]) {
      this.socket.emit('query', this.artists[this.index++])
      this.socket.on('artist', (artist) => this.setState({ artist }))
      this.socket.on('data', (data) => {
        this.setState({ data })
        setTimeout(() => {
          this.loadArtistData()
        }, 2000)
      })
    }
  }

  componentWillMount() {
    this.loadArtistData()
  }

  render () {
    return (
      <div>
        {!(this.state && this.state.artist)
          ? <h1>Fetching Pink Floyd...</h1>
          : (
            <div>
              <h1>{this.state.artist.name}</h1>
              <img src={this.state.artist.images[0].url} />
            </div>
          )
        }
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))