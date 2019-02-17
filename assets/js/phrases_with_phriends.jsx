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
  ' ': { points: 0, count: 2 },
  'E': { points: 1, count: 12 },
  'A': { points: 1, count: 9 },
  'I': { points: 1, count: 9 },
  'O': { points: 1, count: 8 },
  'N': { points: 1, count: 6 },
  'R': { points: 1, count: 6 },
  'T': { points: 1, count: 6 },
  'L': { points: 1, count: 4 },
  'S': { points: 1, count: 4 },
  'U': { points: 1, count: 4 },
  'D': { points: 2, count: 4 },
  'G': { points: 2, count: 3 },
  'B': { points: 3, count: 2 },
  'C': { points: 3, count: 2 },
  'M': { points: 3, count: 2 },
  'P': { points: 3, count: 2 },
  'F': { points: 4, count: 2 },
  'H': { points: 4, count: 2 },
  'V': { points: 4, count: 2 },
  'W': { points: 4, count: 2 },
  'Y': { points: 4, count: 2 },
  'K': { points: 5, count: 1 },
  'J': { points: 8, count: 1 },
  'X': { points: 8, count: 1 },
  'Q': { points: 10, count: 1 },
  'Z': { points: 10, count: 1 },
}

function buildTiles() {
  let tiles = [];
  Object.keys(tileVals).forEach((key) => {
    for (let i = 0; i < tileVals[key].count; i++)
      tiles.push(key);
  });
  return tiles;
}

function initBoard() {
  let board = [];
  for (let val = 'A'; val.charCodeAt(0) <= 'O'.charCodeAt(0); val = nextChar(val)) {
    for (let num = 0; num < 16; num++) {
      board.push(<Space val num type=" " key={num + val}/>);
    }
  }
  return board;
}

function addPlayer() {

}

const initialState = () => {
  return {
    players: [],
    tiles: _.shuffle(buildTiles()),
    board: initBoard(),
    turn: 0
  }
};

class PhrasesWithPhriends extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = initialState();
    this.channel.join().receive("ok", this.update.bind(this)).receive("error", res => { console.log("Unable to join", res)});
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
