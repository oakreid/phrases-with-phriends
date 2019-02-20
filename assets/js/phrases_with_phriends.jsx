import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Space from './space'
import Hand from './hand'

export default function phrases_init(root, channel) {
  ReactDOM.render(<PhrasesWithPhriends channel={channel}/>, root);
}

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

let hasBeenJoined = false;

const tileVals = {
  ' ': 0,
  'E': 1,
  'A': 1,
  'I': 1,
  'O': 1,
  'N': 1,
  'R': 1,
  'T': 1,
  'L': 1,
  'S': 1,
  'U': 1,
  'D': 2,
  'G': 2,
  'B': 3,
  'C': 3,
  'M': 3,
  'P': 3,
  'F': 4,
  'H': 4,
  'V': 4,
  'W': 4,
  'Y': 4,
  'K': 5,
  'J': 8,
  'X': 8,
  'Q': 10,
  'Z': 10,
}

class PhrasesWithPhriends extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    if (!hasBeenJoined) {
      hasBeenJoined = true;
      this.channel.join().receive("ok", this.set_view.bind(this)).receive("error", res => { console.log("Unable to join", res)});
    }
  }

  set_view(view) {
    this.setState(view);
  }



  drawBoard() {
    let { board } = this.state;

    // for (let  = 0; row < board.length; row++) {
    //   for (let col = 1; col < 16; col++) {
    //     board.push(<Space row={row} col={col} tile={null} key={((row+col)*(row+col+1)+col)/2}/>);
    //   }
    // }
    return board.map((tile, i) =>
      <Space row={Math.floor(i/15) + 1} col={(i%15) + 1} tile={tile} key={i}/>
    );
  }



  render() {

    return (this.state ?
      <div>
        <div className="container">{this.drawBoard()}</div>
        <Hand tiles={this.state.player.hand} />
      </div> :
      <div/>
    );
  }
}
