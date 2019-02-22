import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import { gameState, updateBoard, getBoard } from './redux/actions';
import rootReducer from './redux/reducers';
import { writeFileSync, readFileSync } from 'fs';
import {checkWord} from 'check-word';

const store = createStore(rootReducer);

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

Array.prototype.reshape = function(rows, cols) {
  var copy = this.slice(0); // Copy all elements.
  var col = [];

  for (var r = 0; r < rows; r++) {
    var row = [];
    for (var c = 0; c < cols; c++) {
      var i = r * cols + c;
      if (i < copy.length) {
        row.push(copy[i]);
      }
    }
    col.push(row);
  }

  return col;
};

export default function phrases_init(root, channel) {
  ReactDOM.render(
    <Provider store={store}>
      <PhrasesWithPhriends channel={channel}/>
    </Provider>,
    root
  );
}

let hasBeenJoined = false;

class PhrasesWithPhriends extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      board: [],
    };
    this.grid = [];
    if (!hasBeenJoined) {
      hasBeenJoined = true;
      this.channel.on("other_submit", payload => {
        let { board, scores, turn } = payload;
        this.props.gameState({
          board,
          scores,
          turn
        });
        this.setState({
          board,
          scores,
          turn
        });
      });
      this.channel.on("player_disconnected", payload => {
        let { scores, turn } = payload;
        this.props.gameState({
          scores,
          turn
        });
        this.setState({
          scores,
          turn
        });
      });
      this.channel.join().receive("ok", this.set_view.bind(this)).receive("error", res => { console.log("Unable to join", res)});
    }
  }

  set_view(view) {
    let { player } = view;
    player.hand = player.hand.map(val => String.fromCharCode(val))
    this.props.gameState({
      ...view,
      player
    });
    this.setState({
      ...view,
      player
    });
  }

  handleDrop(idx) {
    this.props.updateBoard(idx);

    const { board } = store.getState().reducer

    this.setState({
      board
    });

    this.grid = board.reshape(15, 15);
  }

  handleClick() {
    this.channel.push("submit", {
      word_value: 0,
      new_board: this.state.board,
      hand: this.state.player.hand,
    }).receive("ok", this.set_view.bind(this))
  }

  calcScore(played) {
    let score = 0;
    let seen = []
    played.map(space => {
      let x = Math.floor(space / 15)
      let y = space % 15
      let horizontal = [this.grid[y][x]]
      seen.push(15 * y * x);
      x -= 1;
      while (x >= 0 && !seen.includes(15 * y + x) && !!this.grid[y][x]) {
        seen.push(15 * y * x);
        horizontal.unshift(this.grid[y][x])
        x -= 1;
      }
      x = Math.floor(space / 15)
      while (x <= 15 && !seen.includes(15 * y + x) && !!this.grid[y][x]) {
        seen.push(15 * y * x);
        horizontal.push(this.grid[y][x])
        x += 1;
      }
      x = Math.floor(space / 15)
      let vertical = []
      while (y >= 0 && !seen.includes(15 * y + x) && !!this.grid[y][x]) {
        seen.push(15 * y * x);
        vertical.unshift(this.grid[y][x])
        y -= 1;
      }
      y = space % 15;
      while (y <= 15 && !seen.includes(15 * y + x) && !!this.grid[y][x]) {
        seen.push(15 * y * x);
        vertical.push(this.grid[y][x])
        y += 1;
      }
      console.log(horizontal.join(""), vertical.join(""));
    })
  }

  submit() {
    let {tiles_played, board, player} = store.getState().reducer;
    this.calcScore.bind(this);
    this.channel.push("submit", {word_value: this.calcScore(tiles_played), new_board: board, hand: player.hand}).receive("ok", this.set_view.bind(this));
  }

  render() {
    this.submit = this.submit.bind(this)

    if (!!this.state.board && this.state.board.length > 0) {
      let { board, scores, player, turn } = this.state;
      return (
        <div>
          <Game
            board={board}
            scores={scores}
            player={player}
            turn={turn}
            channel={this.channel}
            onDrop={this.handleDrop.bind(this)}
          />
          <button onClick={() => this.submit()}>Submit</button>
        </div>
      );
    } else {
      return <div/>
    }
  }
}


const mapStateToProps = state => {
  return {
    board: state.board
  }
};

const mapDispatchToProps = dispatch => {
  return {
    gameState: (state) => dispatch(gameState(state)),
    updateBoard: (board) => dispatch(updateBoard(board)),
    getBoard: () => dispatch(getBoard())
  }
}

PhrasesWithPhriends = connect(mapStateToProps, mapDispatchToProps)(PhrasesWithPhriends);
