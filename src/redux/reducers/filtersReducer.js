import { ALL } from '../../constants/filterTypes';
import { CHANGE_FILTER } from '../../constants/actionTypes';

const initialState = [1, 2];

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER: {
      let filters = [...state];
      if (action.filterType === ALL) {
        if (filters.length === 4) {
          filters = [];
        } else {
          filters = [1, 2, 3, 0];
        }
      } else if (!filters.includes(action.filterType)) {
        filters.push(action.filterType);
      } else {
        const index = filters.indexOf(action.filterType);
        const newArr = [...filters.slice(0, index), ...filters.slice(index + 1)];
        filters = newArr;
      }
      return [...filters];
    }
    default:
      return state;
  }
};

export default filtersReducer;
