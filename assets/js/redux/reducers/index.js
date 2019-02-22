import { combineReducers } from 'redux';
import _ from 'lodash';

const initialState = {
  board: [],
  player: {},
  scores: [],
  turn: 0,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      let { board, player } = state;
      let { hand } = player;
      const { idx } = action;
      console.log(idx)
      hand = hand.filter((item, i) => i !== idx)
      player.hand = hand;
      board[state.space] = state.tile;
      return {
        ...state,
        board,
        player
      };
    case 'CURR_TILE':
      const { tile } = action;
      return {
        ...state,
        tile
      };
    case 'CURR_SPACE':
      const { space } = action;
      return {
        ...state,
        space
      };
    case 'GAME_STATE':
      return action.data;
    default:
      return state
  }
};

const rootReducer = combineReducers({
  reducer
});

export default rootReducer
