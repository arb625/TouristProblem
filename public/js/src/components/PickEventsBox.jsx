import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import $ from 'jquery';
import { connect } from 'react-redux';

import EventsBox from './EventsBox.jsx';
import LoadingCircularProgress from '../utils/LoadingCircularProgress.jsx';
import {personalToken} from '../utils/constants';
import {updateAddress, updateStartDate, updateStartTime} from '../redux/modules/searchCriteria';
import {updateEventsSearched, updateEventsDisplayed, toggleEventsAttendingDrawer} from '../redux/modules/events';

export default class PickEventsBox extends React.Component {

  constructor (props) {
    super(props);

    // const defaultAddress = "2360 Ellsworth St #F, Berkeley, CA 94704"
    // const presentDate = new Date()
    // const defaultStartDate = new Date([presentDate.getFullYear(), presentDate.getMonth()+1, presentDate.getDate()])
    // const defaultStartTime = presentDate

    this.state = {
      // address: defaultAddress,
      // leaveDate: defaultStartDate,
      // leaveTime: defaultStartTime,
      // events: [],
      isloadingEvents: false,
    };
  }

  handleAddressChange = (e) => {
    // this.setState({address: e.target.value})
    this.props.updateAddress(e.target.value);
  }

  handleDateChange = (e, date) => {
    // this.setState({leaveDate: date})
    this.props.updateLeaveDate(date);
  }

  handleTimeChange = (e, time) => {
    // this.setState({leaveTime: time})
    this.props.updateLeaveTime(time);
  }

  getUTCtime = (timeObject, dateObject) => {
    // if (!dateObject) return moment.utc(timeObject).valueOf()
    if (!dateObject) {
      console.log(moment(timeObject).add(1, 'days').format());
      return moment(timeObject).add(1, 'days').format();
    }
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const date = dateObject.getDate();
    // return moment.utc(timeObject.setFullYear(year, month, date)).add(30, 'minutes')
    console.log(moment(timeObject.setFullYear(year, month, date)).add(30, 'minutes').format());
    return moment(timeObject.setFullYear(year, month, date)).add(30, 'minutes').format();
  }

  searchEvents = () => {
    // debugger
    // console.log(moment(this.getUTCtime(this.state.leaveDate)).format('LLLL'));
   
    let radius = 20; //miles
   
    let eventsURL = "https://www.eventbriteapi.com/v3/events/search/?" + 
              `token=${personalToken}&` +
              `location.address=${this.props.address}&` +
              `location.within=${radius}mi&` +
              `start_date.range_start=${this.getUTCtime(this.props.startTime, this.props.startDate)}&` +
              `start_date.range_end=${this.getUTCtime(this.props.startDate)}`
    this.setState({isloadingEvents: true})
    // $.ajax({
    //  url: url,
    //  dataType: "json",
    //  success: (data) => {
    //    this.setState({
    //      events: data["events"],
    //      isloadingEvents: false,
    //    });
    //  }
    // });

    Promise.resolve($.ajax({
      url: eventsURL,
      dataType: "json",
    }))
    .then((data) => {
      this.props.updateEventsSearched(data["events"])
      this.props.updateEventsDisplayed(data["events"])
      this.setState({
        isloadingEvents: false,
      });
      this.props.eventsSearched.map((event) => {
        const venueURL = "https://www.eventbriteapi.com/v3/venues/" +
          `${event.venue_id}/?` +
          `token=${personalToken}`

        return Promise.resolve($.ajax({
          url: venueURL,
          dataType: "json",
          success: (data) => {
            console.log(data)
            event.venue = {name: data.name, address: data.address}
            debugger
          }
        }))
      })

    })
  }

  render () {
    const searchCriteriaStyle = {
      display: 'inline',
    };

    return (
      <div style={searchCriteriaStyle}>
        <TextField onChange={this.handleAddressChange} hintText="Your Start Location" defaultValue={this.props.address} />
        <DatePicker onChange={this.handleDateChange} hintText="Trip Start Day" defaultDate={this.props.startDate}/>
        <TimePicker onChange={this.handleTimeChange} hintText="Trip Start Time" defaultTime={this.props.startTime}/>
        <RaisedButton label="Submit" onClick={this.searchEvents} primary={true} />
        <LoadingCircularProgress show={this.state.isloadingEvents} />
        <EventsBox />
        <RaisedButton label="See Picked Events" onClick={this.props.toggleEventsAttendingDrawer} primary={true} />
        <RaisedButton label="Find Best Path" primary={true} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.searchCriteria.address,
    startDate: state.searchCriteria.startDate,
    startTime: state.searchCriteria.startTime,
    eventsSearched: state.events.eventsSearched,
    eventsDispayed: state.events.eventsDispayed,
  };
};

const actions = {updateAddress, updateStartDate, updateStartTime, updateEventsSearched, updateEventsDisplayed, toggleEventsAttendingDrawer};

export default connect(mapStateToProps, actions)(PickEventsBox);
