const initialState = {
  ticketsSort: 'cheapest',
  filters: [1, 2],
  loading: false,
  ticketsArr: [],
  filteredTicketsArr: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SORT': {
      let tickets;
      if (action.sortType === 'cheapest') {
        // Эта дичь сортирует билеты: по возрастанию цены, по возрастанию времени в пути
        tickets = [...state.ticketsArr].sort((aElem, bElem) => aElem.price - bElem.price);
      } else if (action.sortType === 'fastest') {
        tickets = [...state.ticketsArr].sort((aElem, bElem) => {
          const aMinDuration = Math.min(...aElem.segments.map((elem) => elem.duration));
          const bMinDuration = Math.min(...bElem.segments.map((elem) => elem.duration));
          return aMinDuration - bMinDuration;
        });
      } else if (action.sortType === 'optimal') {
        tickets = [...state.ticketsArr].sort((aElem, bElem) => bElem.price - aElem.price);
      }
      return { ...state, ticketsArr: tickets, ticketsSort: action.sortType };
    }
    case 'CHANGE_FILTER': {
      let filters = [...state.filters];
      if (action.filterType === 'all') {
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
    case 'RECEIVE_TICKETS': {
      const prevTicketsArr = state.ticketsArr ? state.ticketsArr : [];
      return { ...state, ticketsArr: [...prevTicketsArr, ...action.ticketsArr], stop: !!action.stop };
    }
    case 'SET_LOADING': {
      return { ...state, loading: !state.loading };
    }
    case 'SET_FILTERED_TICKETS': {
      return { ...state, filteredTicketsArr: action.ticketsArr };
    }
    default:
      return state;
  }
};

export default reducer;
