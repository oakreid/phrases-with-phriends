import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';



class Space extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      tile: null,
      type: props.type
    }
  }

  render() {

    return <div></div>;
  }
}

export default Space;
