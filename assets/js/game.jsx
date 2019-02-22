import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Space from './space';
import Tile from './tile';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

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

class Game extends React.Component {

  constructor(props) {
    super(props);
  }

  drawBoard() {
    let { board, validMove, turns, onDrop } = this.props;

    return board.map((tile, i) =>
      <Space row={Math.floor(i/15) + 1}
              col={(i%15) + 1}
              board={board}
              validMove={validMove}
              onDrop={onDrop}
              turns={turns}
              tile={tile}
              space={i}
              key={i} />
    );
  }



  render() {

    let {player, board, turn, scores } = this.props;

    return (
      <div>
        <p>{'Player ' + (turn + 1) + '\'s turn'}</p>
        <div className="container">
          <div className="board">{this.drawBoard()}</div>
          <div>{
            player.hand.map((tile, i) =>
              <Tile tile={tile} idx={i} board={board} onDrop={this.props.onDrop} key={i}/>
            )}</div>
          </div>
        </div>
    );
  }
}

Game = DragDropContext(HTML5Backend)(Game);

export default Game
