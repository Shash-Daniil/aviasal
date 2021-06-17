import ticketsSort from '../../functions/ticketsSort';
import { CHEAPEST } from '../../constants/sortValues';
import { SET_FILTERED_TICKETS, RECEIVE_TICKETS, CHANGE_SORT } from '../../constants/actionTypes';

const initialState = {
  ticketsSort: CHEAPEST,
  ticketsArr: [],
  filteredTicketsArr: [],
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TICKETS: {
      const prevTicketsArr = state.ticketsArr ? state.ticketsArr : [];
      return {
        ...state,
        ticketsArr: ticketsSort(state.ticketsSort, [...prevTicketsArr, ...action.ticketsArr]),
        stop: !!action.stop,
      };
    }
    case SET_FILTERED_TICKETS: {
      return { ...state, filteredTicketsArr: [...action.ticketsArr] };
    }
    case CHANGE_SORT: {
      const tickets = ticketsSort(action.sortType, state.ticketsArr);
      return { ...state, ticketsArr: tickets, ticketsSort: action.sortType };
    }
    default:
      return state;
  }
};

export default ticketsReducer;
