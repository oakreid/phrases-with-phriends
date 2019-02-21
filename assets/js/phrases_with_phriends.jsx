import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import { gameState, updateBoard, getBoard } from './redux/actions';
import rootReducer from './redux/reducers';

const store = createStore(rootReducer);

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
      board: []
    };
    if (!hasBeenJoined) {
      hasBeenJoined = true;
      this.channel.join().receive("ok", this.set_view.bind(this)).receive("error", res => { console.log("Unable to join", res)});
    }
  }

  set_view(view) {
    let { board, player, scores, turn } = view;
    player.hand = player.hand.map(val => String.fromCharCode(val))
    this.props.gameState({
      board,
      player,
      scores,
      turn
    });
    this.setState({
      board,
      player,
      scores,
      turn
    })
  }

  handleDrop() {
    this.props.updateBoard(this.state.board);

    console.log(store.getState().reducer.board);

    this.setState({
      board: store.getState().reducer.board
    });
  }

  render() {
    console.log(this.state);
    if (this.state.board.length > 0) {
      let { board, scores, player, turn } = this.state;
      return (
        <div>
          <Game
            board={board}
            scores={scores}
            player={player}
            turn={turn}
            channel={this.channel}
            onDrop={this.handleDrop.bind(this, board)}
            />
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
