import {checkStorage, setStorage} from '../helper';
import {
  SET_LIST_SELESAI,
  SET_LIST_TUGAS,
  SET_TUGAS_OFFLINE,
} from './tugasTypes';

const initialState = {
  listTugas: checkStorage('listTugas', null, 'string'),
  listTugasSelesai: checkStorage('listTugasSelesai', null, 'string'),
  tugasOffline: checkStorage('tugasOffline', [], 'string'),
};

const tugasReducer = (state = initialState, action) => {
  if (action.type === SET_LIST_TUGAS) {
    setStorage('listTugas', JSON.stringify(action.payload));
    return {...state, listTugas: action.payload};
  } else if (action.type === SET_LIST_SELESAI) {
    setStorage('listTugasSelesai', JSON.stringify(action.payload));
    return {...state, listTugasSelesai: action.payload};
  } else if (action.type === SET_TUGAS_OFFLINE) {
    setStorage('tugasOffline', JSON.stringify(action.payload));
    return {...state, tugasOffline: action.payload};
  }
  return state;
};

export default tugasReducer;
