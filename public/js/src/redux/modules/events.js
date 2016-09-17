const UPDATE_EVENTS_SEARCHED = 'MyReactSite/events/UPDATE_EVENTS_SEARCHED';
const UPDATE_EVENTS_DISPLAYED = 'MyReactSite/events/UPDATE_EVENTS_DISPLAYED';
const UPDATE_EVENTS_ATTENDING = 'MyReactSite/events/UPDATE_EVENTS_ATTENDING';
const ADD_EVENT_ATTENDING = 'MyReactSite/events/ADD_EVENT_ATTENDING';
const TOGGLE_EVENTS_ATTENDING_DRAWER = 'MyReactSite/events/TOGGLE_EVENTS_ATTENDING_DRAWER';

const initialState = {
  eventsSearched: [],
  eventsDisplayed: [],
  eventsAttending: [],
  eventsAttendingDrawerOpen: false,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_EVENTS_SEARCHED:
      return {...state, eventsSearched: action.payload};
    case UPDATE_EVENTS_DISPLAYED:
      return {...state, eventsDisplayed: action.payload};
    case UPDATE_EVENTS_ATTENDING:
      return {...state, eventsAttending: action.payload};
    case TOGGLE_EVENTS_ATTENDING_DRAWER:
      return {...state, eventsAttendingDrawerOpen: !state.eventsAttendingDrawerOpen};
    case ADD_EVENT_ATTENDING:
      return {...state, eventsAttending: state.eventsAttending.concat([action.payload])};
    default:
      return state;
  }
}

export function updateEventsSearched (eventsSearched) {
  return {type: UPDATE_EVENTS_SEARCHED, payload: eventsSearched};
}

export function updateEventsDisplayed (eventsDisplayed) {
  return {type: UPDATE_EVENTS_DISPLAYED, payload: eventsDisplayed};
}

export function updateEventsAttending (eventsAttending) {
  return {type: UPDATE_EVENTS_ATTENDING, payload: eventsAttending};
}

export function addEventAttending (eventAttending) {
  return {type: ADD_EVENT_ATTENDING, payload: eventAttending};
}

export function toggleEventsAttendingDrawer () {
  return {type: TOGGLE_EVENTS_ATTENDING_DRAWER};
}
