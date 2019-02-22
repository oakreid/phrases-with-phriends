import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Space from './space';
import Tile from './tile';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';



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
