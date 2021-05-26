import { CHEAPEST, FASTEST, OPTIMAL } from '../../constants/sortValues';
import { ALL } from '../../constants/filterTypes';
import {
  SET_FILTERED_TICKETS,
  CHANGE_SORT,
  CHANGE_FILTER,
  RECEIVE_TICKETS,
  SET_LOADING,
} from '../../constants/actionTypes';

const initialState = {
  ticketsSort: CHEAPEST,
  filters: [1, 2],
  loading: false,
  ticketsArr: [],
  filteredTicketsArr: [],
};

function ticketsSort(sortType, arr) {
  let tickets;
  if (sortType === CHEAPEST) {
    // Эта дичь сортирует билеты: по возрастанию цены, по возрастанию времени в пути
    tickets = [...arr].sort((aElem, bElem) => aElem.price - bElem.price);
  } else if (sortType === FASTEST) {
    tickets = [...arr].sort((aElem, bElem) => {
      const aMinDuration = Math.min(...aElem.segments.map((elem) => elem.duration));
      const bMinDuration = Math.min(...bElem.segments.map((elem) => elem.duration));
      return aMinDuration - bMinDuration;
    });
  } else if (sortType === OPTIMAL) {
    tickets = [...arr].sort((aElem, bElem) => bElem.price - aElem.price);
  }
  return tickets;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORT: {
      const tickets = ticketsSort(action.sortType, state.ticketsArr);
      return { ...state, ticketsArr: tickets, ticketsSort: action.sortType };
    }
    case CHANGE_FILTER: {
      let filters = [...state.filters];
      if (action.filterType === ALL) {
        if (filters.length === 4) {
          filters = [];
        } else {
          filters = [1, 2, 3, 0];
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (filters.indexOf(action.filterType) === -1) {
          filters.push(action.filterType);
        } else {
          const index = filters.indexOf(action.filterType);
          const newArr = [...filters.slice(0, index), ...filters.slice(index + 1)];
          filters = newArr;
        }
      }
      return { ...state, filters };
    }
    case RECEIVE_TICKETS: {
      const prevTicketsArr = state.ticketsArr ? state.ticketsArr : [];
      return {
        ...state,
        ticketsArr: ticketsSort(state.ticketsSort, [...prevTicketsArr, ...action.ticketsArr]),
        stop: !!action.stop,
      };
    }
    case SET_LOADING: {
      return { ...state, loading: !state.loading };
    }
    case SET_FILTERED_TICKETS: {
      return { ...state, filteredTicketsArr: [...action.ticketsArr] };
    }
    default:
      return state;
  }
};

export default reducer;
