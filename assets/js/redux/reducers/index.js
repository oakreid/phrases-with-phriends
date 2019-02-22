import { combineReducers } from 'redux';

const initialState = {
  board: [],
  player: {},
  scores: [],
  turn: 0,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      let { board } = state;
      const { space } = action;
      board[space] = state.tile;
      return {
        ...state,
        board
      };
    case 'CURR_TILE':
      const { tile } = action;
      return {
        ...state,
        tile
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
