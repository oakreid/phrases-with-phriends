import React from 'react';
import ReactDOM from 'react-dom';

class Hand extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tiles: props.tiles
    }
  }

  render() {

    const { tiles } = this.state;

  return (
		<div>
			{tiles.map((tile, i) => (
        <div className="tile" key={i}>tile</div>
      ))}
		</div>
	)
  }
}

export default Hand;
