import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function phrases_init(root, channel) {
  ReactDOM.render(<PhrasesWithPhriends channel={channel}/>, root);
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
      tiles.push(tileVals[key]);
  });
  return tiles;
}

const initialState = () => {
  return {
    players: [],
    tiles: buildTiles(),
    board: []
  }
};

class PhrasesWithPhriends extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = initialState();
    this.channel.join().receive("ok", this.fresh_state.bind(this)).receive("error", res => { console.log("Unable to join", res)});
  }

  fresh_state(view) {
    this.setState(view.game);
  }

  render() {

    return <div></div>;
  }
}
