import { combineReducers } from 'redux';
import filtersReducer from './filtersReducer';
import ticketsReducer from './ticketsReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  loading: loadingReducer,
  filters: filtersReducer,
  ticketsReducer,
});
