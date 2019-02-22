export const updateBoard = (state) => {
  return {
    type: 'UPDATE_BOARD'
  }
}

export const currTile = (tile) => {
  return {
    type: 'CURR_TILE',
    tile
  }
}

export const currSpace = (space) => {
  return {
    type: 'CURR_SPACE',
    space
  }
}

export const gameState = (data) => {
  return {
    type: 'GAME_STATE',
    data
  }
}