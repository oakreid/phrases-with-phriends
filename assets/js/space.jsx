import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';



class Space extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      col: props.col,
      tile: props.tile
    }
  }

  render() {

    const {row, col, tile} = this.state;

    let type = ""

    if (tile)
      type = tile;

    else {
      if ((row === col) || (row + col === 16))
        type = "2xWS";
      if ([1, 8, 15].includes(row) && [1, 8, 15].includes(col))
        type = "3xWS";
      if (([1, 8, 15].includes(row) && [4, 12].includes(col)) ||
          ([3, 13].includes(row) && [7, 9].includes(col)) ||
          ([4, 12].includes(row) && [1, 8, 15].includes(col)) ||
          ([7, 9].includes(row) && [3, 7, 9, 13].includes(col)))
        type = "2xLS";
      if (([2, 14].includes(row) && [6, 10].includes(col)) ||
          ([6, 10].includes(row) && [2, 6, 10, 14].includes(col)))
        type = "3xLS";
      if (row === 8 && col === 8)
        type = "*";
    }

    let color;
    switch(type) {
      case '2xLS':
        color = 'lightBlue';
        break;
      case '3xLS':
        color = 'blue';
        break;
      case '2xWS':
      case '*':
        color = 'pink';
        break;
      case '3xWS':
        color = 'red';
        break;
      case "":
        color = 'white';
        break;
      default:
        color = 'yellow';
        break;
    }

  return (
		<div
			style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
				backgroundColor: color,
        width: '40px',
        height: '40px',
        borderStyle: 'solid'
			}}
		>
			{type}
		</div>
	)
  }
}

export default Space;
