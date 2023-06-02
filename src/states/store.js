import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import homeReducer from './home/homeReducer';
import surveyReducer from './survey/surveyReducer';
import pengaduanReducer from './pengaduan/pengaduanReducer';
import tugasReducer from './tugas/tugasReducer';
import logistikReducer from './logistik/logistikReducer';

const reducer = combineReducers({
  authReducer: authReducer,
  homeReducer: homeReducer,
  surveyReducer: surveyReducer,
  pengaduanReducer: pengaduanReducer,
  tugasReducer: tugasReducer,
  logistikReducer: logistikReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
