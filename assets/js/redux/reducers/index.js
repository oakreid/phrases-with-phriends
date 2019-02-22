import { combineReducers } from 'redux';
import _ from 'lodash';

const initialState = {
  board: [],
  player: {},
  scores: [],
  turn: 0,
  tiles_played: []
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      let { board, player } = state;
      let { hand } = player;
      const { idx } = action;
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
      let {tiles_played} = state;
      tiles_played.push(space);
      return {
        ...state,
        space,
        tiles_played
      };
    case 'GAME_STATE':
      return {
        ...state,
        ...action.data
      };
    default:
      return state
  }
};

const rootReducer = combineReducers({
  reducer
});

export default rootReducer
