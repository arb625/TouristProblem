import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

export default class PickedEventsList extends React.Component {
  // constructor (props) {
  //  super(props)
  //  this.state = {open: false};
  // }

  // handleToggle = () => this.setState({open: !this.state.open});

  render () {
    return (
      <div>
        <Drawer open={this.props.open} openSecondary={true}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.events.eventsAttendingDrawerOpen,
  };
};

const actions = {};

export default connect(mapStateToProps, actions)(PickedEventsList);
