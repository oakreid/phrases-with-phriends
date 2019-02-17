import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';



class Space extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      num: props.num,
      val: props.val,
      tile: null,
      type: props.type
    }
  }

  render() {

    let color;
    switch(this.state.type) {
      case '2xLS':
        color = 'light-blue';
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
      default:
        color = 'white'
        break;
    }

  return (
		<div
			style={{
				color
			}}
		>
			{this.state.type}
		</div>
	)
  }
}

export default Space;
