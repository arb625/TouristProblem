import React from 'react';
import _ from 'underscore';

import mockMapPointsFC from '../utils/mockFC';

export default class MapView extends React.Component {
  constructor (props) {
    super(props);
    debugger
    console.log(props);
    console.log(this.props);
    _.each(props.mapPointsFC.features, (feature, index)=> {
      const coord = feature.geometry.coordinates
      const position = {lat: coord[1], lng: coord[0]}
      var marker = new google.maps.Marker({
          position: position,
          title:`event {index}`,
      });
      marker.setMap(map);
    })
  }

  static propTypes = {
    mapPointsFC: React.PropTypes.object,
  }

  componentWillReceiveProps (nextProps) {
    // _.each(nextProps.mapPointsFC.features, (feature, index)=> {
    //  debugger
    //  const coord = feature.geometry.coordinates
    //  const position = {lat: coord[0], lng: coord[1]}
    //  var marker = new google.maps.Marker({
    //      position: position,
    //      title:`event {index}`
    //  });
    //  marker.setMap(map)
    // })
  }

  render () {
    return (<div></div>)
  }
}

MapView.defaultProps = {
  mapPointsFC: mockMapPointsFC,
}