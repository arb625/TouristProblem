const UPDATE_ADDRESS = 'MyReactSite/searchCriteria/UPDATE_ADDRESS';
const UPDATE_START_DATE = 'MyReactSite/searchCriteria/UPDATE_START_DATE';
const UPDATE_START_TIME = 'MyReactSite/searchCriteria/UPDATE_START_TIME';

const defaultAddress = '2360 Ellsworth St #F, Berkeley, CA 94704';
const presentDate = new Date();
const defaultStartDate = new Date([presentDate.getFullYear(), presentDate.getMonth()+1, presentDate.getDate()]);
const defaultStartTime = presentDate;

const initialState = {
  address: defaultAddress,
  startDate: defaultStartDate,
  startTime: defaultStartTime,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return {...state, address: action.payload};
    case UPDATE_START_DATE:
      return {...state, startDate: action.payload};
    case UPDATE_START_TIME:
      return {...state, startTime: action.payload};
    default:
      return state;
  }
}

export function updateAddress (address) {
  return {type: UPDATE_ADDRESS, payload: address};
}

export function updateStartDate (dateObject) {
  return {type: UPDATE_START_DATE, payload: dateObject};
}

export function updateStartTime (timeObject) {
  return {type: UPDATE_START_TIME, payload: timeObject};
}
