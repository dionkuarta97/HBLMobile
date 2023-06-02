import {checkStorage, setStorage} from '../helper';
import {
  SET_ANSWER_SURVEY,
  SET_CALEG,
  SET_PARTAI,
  SET_SURVEY,
  SET_SURVEY_BODY,
  SET_SURVEY_KHUSUS,
  SET_SURVEY_OFFLINE,
} from './surveyTypes';

const initialState = {
  listSurvey: checkStorage('listSurvey', null, 'string'),
  surveyOffline: checkStorage('surveyOffline', [], 'string'),
  surveyBody: checkStorage('surveyBody', [], 'string'),
  answerSurvey: null,
  listPartai: null,
  listCaleg: null,
  surveyKhusus: {
    dprRi: {
      caleg: null,
      partai: null,
    },
    dprProv: {
      caleg: null,
      partai: null,
    },
    dprKab: {
      caleg: null,
      partai: null,
    },
  },
};

const surveyReducer = (state = initialState, action) => {
  if (action.type === SET_SURVEY) {
    setStorage('listSurvey', JSON.stringify(action.payload));
    return {...state, listSurvey: action.payload};
  } else if (action.type === SET_ANSWER_SURVEY) {
    return {...state, answerSurvey: action.payload};
  } else if (action.type === SET_SURVEY_OFFLINE) {
    setStorage('surveyOffline', JSON.stringify(action.payload));
    return {...state, surveyOffline: action.payload};
  } else if (action.type === SET_SURVEY_BODY) {
    setStorage('surveyBody', JSON.stringify(action.payload));
    return {...state, surveyBody: action.payload};
  } else if (action.type === SET_PARTAI) {
    return {...state, listPartai: action.payload};
  } else if (action.type === SET_SURVEY_KHUSUS) {
    return {...state, surveyKhusus: action.payload};
  } else if (action.type === SET_CALEG) {
    return {...state, listCaleg: action.payload};
  }
  return state;
};

export default surveyReducer;
