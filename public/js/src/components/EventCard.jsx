import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {lightGreenA400} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import $ from 'jquery';
import { connect } from 'react-redux'

import {personalToken} from '../utils/constants'
import {addEventAttending} from '../redux/modules/events'

export default class EventCard extends React.Component {
	static propTypes = {
		event: React.PropTypes.object.isRequired,
	}
	constructor (props) {
		super(props);
	}

	render () {
		const event = this.props.event

		const cardStyle = {
			borderWidth: "20px",
			margin: "25px",
		}

		const descriptionLines = event.description.text ? event.description.text.split("\n").map(function(line, index) {
			return (<p key={index}>{line}</p>);
		}) : "";

		// const url = "https://www.eventbriteapi.com/v3/venues/" +
		// 						`${event.venue_id}/?` +
		// 						`token=${personalToken}`

		// $.ajax({
		// 	url: url,
		// 	dataType: "json",
		// 	success: (data) => {
		// 		console.log(data)
		// 		event.venue = {name: data.name, address: data.address}
		// 	}
		// })

		return (
			<Card style={cardStyle}>
				<CardMedia>
					<img src={event.logo ? event.logo.url : ""} />
				</CardMedia>
				<CardTitle 
					title={event.name.text} 
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText>
					<p>Starts: {moment(event.start.local).format('LLLL')}</p>
					<p>Ends: {moment(event.end.local).format('LLLL')}</p>
					<p>Location Name: {event.venue ? event.venue.name : ""}</p>
					<p>Location Address: {event.venue ? event.venue.address : ""}</p>
				</CardText>
				<CardText expandable={true}>
					{descriptionLines}
				</CardText>
				<CardActions style={{marginLeft: "auto", marginRight: "auto", width: "50px"}}>
					<FlatButton
						label="Attending" 
						backgroundColor={lightGreenA400}
						onClick={() => this.props.addEventAttending(event)}
					/>
				</CardActions>
			</Card>
		)
	}
}

const actions = {addEventAttending}

export default connect(undefined, actions)(EventCard)
