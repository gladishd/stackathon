import React from 'react'
import {Howl, Howler} from 'howler'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: true
    }
  }
  SoundPlay = () => {
    const Sounds = new Howl({
      src: ['/space_sound.wav']
    })
    Sounds.play()
    console.log('sound')
  }
  Radio = () => {
    let play = this.state.play
    this.setState({play: !play})
    console.log(play)
    var stream = new Howl({
      src: [
        'http://prclive1.listenon.in:9960/?fbclid=IwAR1bAO9Hf-yvOGrjKVVdYt0XXnqo85o1G2IXWrzVtjIujOit5JqW7oQUtfI'
      ],
      ext: ['mp3'],
      autoplay: true,
      html5: true
    })
    var id1 = stream.play()
    stream.fade(0, 1, 100, id1)
    // sound.rate(1.5, id2);
  }

  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.SoundPlay}>
          play
        </button>
        <button type="button" onClick={this.Radio}>
          Radio
        </button>
        <button type="button" onClick={this.Fade}>
          Fade
        </button>
      </div>
    )
  }
}

export default App
