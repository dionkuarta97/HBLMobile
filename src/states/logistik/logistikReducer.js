import {checkStorage, setStorage} from '../helper';
import {
  SET_LIST_LOGISTIK,
  SET_LOGISTIK_OFFLINE,
  SET_LOGISTIK_SELESAI,
} from './logistikTypes';

const initialState = {
  listLogistikAktif: checkStorage('listLogistikAktif', null, 'string'),
  listLogistikSelesai: checkStorage('listLogistikSelesai', null, 'string'),
  logistikOffline: checkStorage('logistikOffline', [], 'string'),
};

const logistikReducer = (state = initialState, action) => {
  if (action.type === SET_LIST_LOGISTIK) {
    setStorage('listLogistikAktif', JSON.stringify(action.payload));
    return {...state, listLogistikAktif: action.payload};
  } else if (action.type === SET_LOGISTIK_SELESAI) {
    setStorage('listLogistikSelesai', JSON.stringify(action.payload));
    return {...state, listLogistikSelesai: action.payload};
  } else if (action.type === SET_LOGISTIK_OFFLINE) {
    setStorage('logistikOffline', JSON.stringify(action.payload));
    return {...state, logistikOffline: action.payload};
  }
  return state;
};

export default logistikReducer;
