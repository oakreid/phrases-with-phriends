import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Space from './space'

export default function phrases_init(root, channel) {
  ReactDOM.render(<PhrasesWithPhriends channel={channel}/>, root);
}

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

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

function initBoard() {
  let board = [];
  for (let row = 1; row < 16; row++) {
    for (let col = 1; col < 16; col++) {
      board.push(<Space row={row} col={col} key={((row+col)*(row+col+1)+col)/2}/>);
    }
  }
  return board;
}

const initialState = {
  players: [],
  tiles: [],
  board: [],
  turn: 0
};

class PhrasesWithPhriends extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = initialState;
    this.channel.join().receive("ok", this.update.bind(this)).receive("error", res => { console.log("Unable to join", res)});
  }

  componentDidMount() {
    this.setState(
      _.assign({}, this.state, {board: initBoard()})
    );
  }

  update(view) {
    this.setState(view.game);
  }

  addPlayer() {
    this.setState(prevState => ({
      players: [...prevState.players,
        {
          id: prevState.players.length,
          hand: [],
          score: 0,
        }
      ]
    }))
  }

  drawTiles(used) {
    let { board, tiles, players: [{hand}] } = this.state;
    for (let i = tiles.length; i < 7; i++) {
      hand.push(tiles.pop())
    }
    this.setState({
      tiles,
      players
    });
  }

  render() {

    return <div className="container">{this.state.board}</div>;
  }
}
