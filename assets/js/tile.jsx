import React from 'react';
import { DragSource } from 'react-dnd';
import {connect} from 'react-redux';
import { currTile } from './redux/actions';

const tileSource = {
  beginDrag(props) {
    props.currTile(props.tile);
    return {
      tile: props.tile,
      board: props.board,
      onDrop: props.onDrop
    };
  },
  // endDrag(props, monitor) {
  //   if (monitor.didDrop()) {
  //     console.log('fuck');
  //     props.onDrop();
  //   }
  // }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Tile extends React.Component {
    render() {
    const { tile, connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="tile">
        {tile}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    currTile: (tile) => dispatch(currTile(tile))
  }
}

Tile = DragSource('tile', tileSource, collect)(Tile);
Tile = connect(mapStateToProps, mapDispatchToProps)(Tile);

export default Tile;
