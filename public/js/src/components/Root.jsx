import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PickEventsBox from './PickEventsBox.jsx';
import PickedEventsList from './PickedEventsList.jsx';
import MapView from './MapView.jsx';

export default class Root extends React.Component {

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <PickEventsBox />
          <PickedEventsList />
          <MapView />
        </div>
      </MuiThemeProvider>
    );
  }
}

