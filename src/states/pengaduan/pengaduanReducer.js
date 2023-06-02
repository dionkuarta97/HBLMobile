import {checkStorage, setStorage} from '../helper';
import {
  SET_LIST_PENGADUAN,
  SET_LST_PENGADUAN_OFFLINE,
  SET_TEMPAT_SIMPAN,
} from './pengaduanTypes';

const initialState = {
  listPengaduan: checkStorage('listPengaduan', null, 'string'),
  listPengaduanOffline: checkStorage('listPengaduanOffline', null, 'string'),
  tempatSimpan: checkStorage('tempatSimpan', [], 'string'),
};

const pengaduanReducer = (state = initialState, action) => {
  if (action.type === SET_LIST_PENGADUAN) {
    setStorage('listPengaduan', JSON.stringify(action.payload));
    return {...state, listPengaduan: action.payload};
  } else if (action.type === SET_LST_PENGADUAN_OFFLINE) {
    setStorage('listPengaduanOffline', JSON.stringify(action.payload));
    return {...state, listPengaduanOffline: action.payload};
  } else if (action.type === SET_TEMPAT_SIMPAN) {
    setStorage('tempatSimpan', JSON.stringify(action.payload));
    return {...state, tempatSimpan: action.payload};
  }
  return state;
};

export default pengaduanReducer;
