import { SET_LOADING } from '../../constants/actionTypes';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return !state;
    }
    default:
      return state;
  }
};

export default loadingReducer;
