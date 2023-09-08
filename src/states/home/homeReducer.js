import {checkStorage, setStorage} from '../helper';
import {
  SET_DAHSBOARD_BERITA,
  SET_DASHBOARD_DATA,
  SET_JUMLAH_PEMILIH,
  SET_LIST_BERITA,
  SET_LOCATION,
  SET_QUICKCOUNT_ANSWER,
  SET_VIDEO_ID,
} from './homeTypes';

const initialState = {
  dashboardData: checkStorage('dashboardData', null, 'string'),
  videoId: checkStorage('videoId', null, 'string'),
  dashboardBerita: checkStorage('dashboardBerita', null, 'string'),
  listBerita: checkStorage('listBerita', null, 'string'),
  location: checkStorage('location', null, 'string'),
  jumlahPemilih: checkStorage('jumlahPemilih', [], 'string'),
  quickCountAnswer: checkStorage(
    'quickCountAnswer',
    [
      {
        tingkat: 1,
        answer: [],
      },
      {
        tingkat: 2,
        answer: [],
      },
      {
        tingkat: 3,
        answer: [],
      },
    ],
    'string',
  ),
};

const homeReducer = (state = initialState, action) => {
  if (action.type === SET_DASHBOARD_DATA) {
    setStorage('dashboardData', JSON.stringify(action.payload));
    return {...state, dashboardData: action.payload};
  } else if (action.type === SET_VIDEO_ID) {
    setStorage('videoId', JSON.stringify(action.payload));
    return {...state, videoId: action.payload};
  } else if (action.type === SET_DAHSBOARD_BERITA) {
    setStorage('dashboardBerita', JSON.stringify(action.payload));
    return {...state, dashboardBerita: action.payload};
  } else if (action.type === SET_LIST_BERITA) {
    setStorage('listBerita', JSON.stringify(action.payload));
    return {...state, listBerita: action.payload};
  } else if (action.type === SET_LOCATION) {
    setStorage('location', JSON.stringify(action.payload));
    return {...state, location: action.payload};
  } else if (action.type === SET_JUMLAH_PEMILIH) {
    setStorage('jumlahPemilih', JSON.stringify(action.payload));
    return {...state, jumlahPemilih: action.payload};
  } else if (action.type === SET_QUICKCOUNT_ANSWER) {
    setStorage('quickCountAnswer', JSON.stringify(action.payload));
    return {...state, quickCountAnswer: action.payload};
  }
  return state;
};

export default homeReducer;
