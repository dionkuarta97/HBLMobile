const {SET_USER} = require('./authTypes');

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  if (action.type === SET_USER) {
    return {...state, user: action.payload};
  }

  return state;
};

export default authReducer;
