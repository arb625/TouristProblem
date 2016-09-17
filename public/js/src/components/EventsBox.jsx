import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {lightGreenA400} from 'material-ui/styles/colors'
import { connect } from 'react-redux'

import EventCard from './EventCard.jsx';


export default class EventsBox extends React.Component {
	static propTypes = {
		eventsDisplayed: React.PropTypes.array.isRequired,
	}
	
	render () {
		console.log(this.props.eventsDisplayed)

		const cardStyle = {
			borderWidth: "20px",
			margin: "25px",
		}

		const eventBoxes = this.props.eventsDisplayed.map((event) => {

			// const descriptionLines = event.description.text ? event.description.text.split("\n").map(function(line, index) {
			// 	return (<p key={index}>{line}</p>);
			// }) : "";

			return (
				/*
				<Card key={event.id} style={cardStyle}>
					<CardMedia>
						<img src={event.logo ? event.logo.url : ""} />
					</CardMedia>
					<CardTitle 
						title={event.name.text} 
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						{descriptionLines}
					</CardText>
					<CardActions style={{marginLeft: "auto", marginRight: "auto", width: "50px"}}>
						<FlatButton
							label="Attending" 
							backgroundColor={lightGreenA400}
						/>
					</CardActions>
				</Card>
				*/
				<EventCard key={event.id} event={event} />
			)
		})

		// const styles = {
		//   root: {
		//     display: 'flex',
		//     flexWrap: 'wrap',
		//     justifyContent: 'space-around',
		//   },
		//   gridList: {
		//     width: 500,
		//     height: 500,
		//     overflowY: 'auto',
		//     marginBottom: 24,
		//   },
		// };

		// return (
		//   <div style={styles.root}>
		//   	try {
		// 	    <GridList
		// 	      cellHeight={200}
		// 	      style={styles.gridList}
		// 	    >
		// 	      {this.props.events.map((event, index) => {
		// 	      	try {
		// 		      	console.log(event)
		// 		      	console.log(index)
		//     				const descriptionLines = event.description.text ? event.description.text.split("\n").map(function(line) {
		// 			        return (<p>{line}</p>);
		// 			      }) : "";
		// 		        <GridTile
		// 		          key={event.id}
		// 		          title={event.name.text}
		// 		          subtitle={descriptionLines}
		// 		          actionIcon={<RaisedButton label="See More" primary={true} />}
		// 		        >
		// 		          <img src={event.logo ? event.logo.url : ""} />
		// 		        </GridTile>
		// 		      } catch (err) {
		// 		      	console.log(err)
		// 		      	return (<GridTile></GridTile>);
		// 		      }
		// 	      })}
		// 	    </GridList>
		//    } catch (err) {
		//    	<GridList></GridList>;
		//    }
		// 	</div>
		// )

		return (
			<div>
				{eventBoxes}
				<RaisedButton 
					primary={true}
					label="See More"
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
  	eventsDisplayed: state.events.eventsDisplayed,
  }
}

export default connect(mapStateToProps)(EventsBox)
