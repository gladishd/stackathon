import React from 'react'
import { Howl, Howler } from 'howler'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: true
    }
  }
  SoundPlay = () => {
    const Sounds = new Howl({ src: ['/space_sound.wav'] })
    Sounds.play()
  }
  sound1 = () => {
    const Sounds = new Howl({ src: ['/1.wav'] })
    Sounds.play()
  }
  sound2 = () => {
    const Sounds = new Howl({ src: ['/2.wav'] })
    Sounds.play()
  }
  sound3 = () => {
    const Sounds = new Howl({ src: ['/3.wav'] })
    Sounds.play()
  }
  sound4 = () => {
    const Sounds = new Howl({ src: ['/4.wav'] })
    Sounds.play()
  }
  sound5 = () => {
    const Sounds = new Howl({ src: ['/5.wav'] })
    Sounds.play()
  }
  sound6 = () => {
    const Sounds = new Howl({ src: ['/6.wav'] })
    Sounds.play()
  }
  sound7 = () => {
    const Sounds = new Howl({ src: ['/7.wav'] })
    Sounds.play()
  }
  sound8 = () => {
    const Sounds = new Howl({ src: ['/8.wav'] })
    Sounds.play()
  }
  sound9 = () => {
    const Sounds = new Howl({ src: ['/9.aiff'] })
    Sounds.play()
  }
  sound10 = () => {
    const Sounds = new Howl({ src: ['/10.mp3'] })
    Sounds.play()
  }
  sound11 = () => {
    const Sounds = new Howl({ src: ['/11.wav'] })
    Sounds.play()
  }
  sound12 = () => {
    const Sounds = new Howl({ src: ['/12.wav'] })
    Sounds.play()
  }
  sound13 = () => {
    const Sounds = new Howl({ src: ['/13.mp3'] })
    Sounds.play()
  }
  sound14 = () => {
    const Sounds = new Howl({ src: ['/14.wav'] })
    Sounds.play()
  }
  sound15 = () => {
    const Sounds = new Howl({ src: ['/15.mp3'] })
    Sounds.play()
  }
  sound16 = () => {
    const Sounds = new Howl({ src: ['/16.wav'] })
    Sounds.play()
  }



  Radio = () => {
    let play = this.state.play
    this.setState({ play: !play })
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
        <button type="button" onClick={this.sound16}>
          play
        </button>
        <button type="button" onClick={this.sound2}>
          play
        </button>
        <button type="button" onClick={this.sound3}>
          play
        </button>
        <button type="button" onClick={this.sound4}>
          play
        </button>
        <button type="button" onClick={this.sound5}>
          play
        </button>
        <button type="button" onClick={this.sound6}>
          play
        </button>
        <button type="button" onClick={this.sound7}>
          play
        </button>
        <button type="button" onClick={this.sound8}>
          play
        </button>
        <button type="button" onClick={this.sound9}>
          play
        </button>
        <button type="button" onClick={this.sound10}>
          play
        </button>
        <button type="button" onClick={this.sound11}>
          play
        </button>
        <button type="button" onClick={this.sound12}>
          play
        </button>
        <button type="button" onClick={this.sound13}>
          play
        </button>
        <button type="button" onClick={this.sound14}>
          play
        </button>
        <button type="button" onClick={this.sound15}>
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
