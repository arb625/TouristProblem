import { combineReducers } from 'redux';
import searchCriteria from './modules/searchCriteria';
import events from './modules/events';

export default combineReducers({
  searchCriteria,
  events,
});
