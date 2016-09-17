import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

export default class LoadingCircularProgress extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
  }

  render () {
    if (!this.props.show) {
      return (<div />);
    } else {
      const style = {
        height: 106,
        width: 106,
        margin: 20,
        display: 'inline-block',
        position: 'fixed',
        zIndex: 99,
        left: window.innerWidth / 2 - 53,
        top: window.innerHeight/ 2 - 53,
      };
      return (
        <Paper style={style} zDepth={4} circle>
          <CircularProgress size={1.5} />
        </Paper>
      );
    }
  }
}
