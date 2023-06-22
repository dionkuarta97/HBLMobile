import {checkStorage, setStorage} from '../helper';

const {SET_USER, SET_LOGIN, SET_REFERAL, SET_BANTUAN} = require('./authTypes');

const initialState = {
  user: checkStorage('user', null, 'string'),
  isLogin: checkStorage('isLogin', null, 'boolean'),
  penghubung: checkStorage('penghubung', null, 'string'),
  bantuan: checkStorage('bantuan', null, 'string'),
};

const authReducer = (state = initialState, action) => {
  if (action.type === SET_USER) {
    setStorage('user', JSON.stringify(action.payload));
    return {...state, user: action.payload};
  } else if (action.type === SET_LOGIN) {
    setStorage('isLogin', action.payload);
    return {...state, isLogin: action.payload};
  } else if (action.type === SET_REFERAL) {
    setStorage('penghubung', JSON.stringify(action.payload));
    return {...state, penghubung: action.payload};
  } else if (action.type === SET_BANTUAN) {
    setStorage('bantuan', JSON.stringify(action.payload));
    return {...state, bantuan: action.payload};
  }

  return state;
};

export default authReducer;
