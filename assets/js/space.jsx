import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class PhrasesWithPhriends extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = initialState();
    this.channel.join().receive("ok", this.fresh_state.bind(this)).receive("error", res => { console.log("Unable to join", res)});
  }

  fresh_state(view) {
    this.setState(view.game);
  }

  render() {

    return <div></div>;
  }
}

export default Space;
