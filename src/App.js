import React from "react";

const bankOneRowOne = [
  {
    audioId: "Q",
    title: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    audioId: "W",
    title: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    audioId: "E",
    title: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
];

const bankOneRowTwo = [
  {
    audioId: "A",
    title: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    audioId: "S",
    title: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    audioId: "D",
    title: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
];

const bankOneRowThree = [
  {
    audioId: "Z",
    title: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    audioId: "X",
    title: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    audioId: "C",
    title: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwoRowOne = [
  {
    audioId: "Q",
    title: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    audioId: "W",
    title: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    audioId: "E",
    title: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
];

const bankTwoRowTwo = [
  {
    audioId: "A",
    title: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    audioId: "S",
    title: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    audioId: "D",
    title: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
];

const bankTwoRowThree = [
  {
    audioId: "Z",
    title: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    audioId: "X",
    title: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    audioId: "C",
    title: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: false,
      bank: false,
      displayValue: "",
      volume: 0.5,
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.controlVolume = this.controlVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("click", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("click", this.handleClick);
  }
  togglePower() {
    this.setState((state) => ({
      power: !state.power,
    }));
  }
  toggleBank() {
    this.setState((state) => ({
      bank: !state.bank,
    }));
  }
  controlVolume(event) {
    if (this.state.power) {
      this.setState({
        volume: event.target.value,
        displayValue: "Volume: " + Math.round(event.target.value * 100),
      });
      setTimeout(() => this.clearDisplay(), 1500);
    }
  }
  setDisplay(valueName) {
    this.setState({
      displayValue: valueName,
    });
  }
  clearDisplay() {
    this.setState({
      displayValue: String.fromCharCode(160),
    });
  }
  playAudio(value) {
    const sound = document.getElementById(value);
    if (sound !== null && this.state.power) {
      sound.currentTime = 0;
      sound.volume = this.state.volume;
      sound.play();
      this.setDisplay(sound.getAttribute("title"));
    }
  }
  handleKeyPress(event) {
    this.playAudio(event.key.toUpperCase());
  }
  handleClick(event) {
    this.playAudio(event.target.id.toUpperCase());
  }
  render() {
    return (
      <DrumMachine
        displayValue={this.state.displayValue}
        volume={this.state.volume}
        bank={this.state.bank}
        controlVolume={this.controlVolume}
        togglePower={this.togglePower}
        toggleBank={this.toggleBank}
        playAudio={this.playAudio}
      />
    );
  }
}

const DrumMachine = function (props) {
  return (
    <div
      id="drum-machine"
      className="d-flex justify-content-center align-items-center h-100"
      style={{ backgroundColor: "gray" }}
    >
      <div
        style={{ padding: "40px", backgroundColor: "lightgray" }}
        className="d-flex justify-content-between align-items-center border border-5 border-warning"
      >
        <TablePad bank={props.bank} playAudio={props.playAudio} />
        <div style={{ padding: "15px", backgroundColor: "lightgray" }}></div>
        <div>
          <SwitchSelect toggle={props.togglePower} label="Power" />
          <SwitchSelect toggle={props.toggleBank} label="Bank" />
          <br />
          <div
            id="display"
            style={{
              height: "45px",
              width: "150px",
              margin: "auto",
              backgroundColor: "gray",
              textAlign: "center",
              lineHeight: "45px",
              color: "lightgreen",
            }}
          >
            {props.displayValue}
          </div>
          <div>
            <br />
            <input
              type="range"
              className="form-control-range"
              id="controlVolume"
              min="0"
              max="1"
              step="0.1"
              value={props.volume}
              onChange={props.controlVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TablePad = function (props) {
  return (
    <div id="pad" className="btn-group btn-group-lg">
      <table>
        <tbody>
          <tr>
            {!props.bank &&
              bankOneRowOne.map((element) => (
                <KeyPad
                  id={element.audioId.toLowerCase()}
                  key={element.audioId.toLowerCase()}
                  value={element.audioId}
                  url={element.url}
                  title={element.title}
                  playAudio={props.playAudio}
                />
              ))}
            {props.bank &&
              bankTwoRowOne.map((element) => (
                <KeyPad
                  id={element.audioId.toLowerCase()}
                  key={element.audioId.toLowerCase()}
                  value={element.audioId}
                  url={element.url}
                  title={element.title}
                  playAudio={props.playAudio}
                />
              ))}
          </tr>
          <tr>
            {!props.bank &&
              bankOneRowTwo.map((element) => (
                <KeyPad
                  id={element.audioId.toLowerCase()}
                  key={element.audioId.toLowerCase()}
                  value={element.audioId}
                  url={element.url}
                  title={element.title}
                  playAudio={props.playAudio}
                />
              ))}
            {props.bank &&
              bankTwoRowTwo.map((element) => (
                <KeyPad
                  id={element.audioId.toLowerCase()}
                  key={element.audioId.toLowerCase()}
                  value={element.audioId}
                  url={element.url}
                  title={element.title}
                  playAudio={props.playAudio}
                />
              ))}
          </tr>
          <tr>
            {!props.bank &&
              bankOneRowThree.map((element) => (
                <KeyPad
                  id={element.audioId.toLowerCase()}
                  key={element.audioId.toLowerCase()}
                  value={element.audioId}
                  url={element.url}
                  title={element.title}
                  playAudio={props.playAudio}
                />
              ))}
            {props.bank &&
              bankTwoRowThree.map((element) => (
                <KeyPad
                  id={element.audioId.toLowerCase()}
                  key={element.audioId.toLowerCase()}
                  value={element.audioId}
                  url={element.url}
                  title={element.title}
                  playAudio={props.playAudio}
                />
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const KeyPad = function (props) {
  return (
    <th>
      <div
        className="btn btn-secondary drum-pad"
        style={{ width: "40px", padding: "12px", margin: "3px" }}
        id={props.id}
        onClick={props.playAudio}
      >
        <audio
          className="clip"
          id={props.value}
          src={props.url}
          title={props.title}
          preload="auto"
        />
        {props.value}
      </div>
    </th>
  );
};

const SwitchSelect = function (props) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        onClick={props.toggle}
      />
      <label className="form-check-label">{props.label} Switch</label>
    </div>
  );
};

export default App;
