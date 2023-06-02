import dionServer from '../dionServer';
import server from '../server';
import {
  SET_ANSWER_SURVEY,
  SET_CALEG,
  SET_PARTAI,
  SET_SURVEY,
  SET_SURVEY_BODY,
  SET_SURVEY_KHUSUS,
  SET_SURVEY_OFFLINE,
} from './surveyTypes';

export const setSurvey = payload => {
  return {
    type: SET_SURVEY,
    payload,
  };
};

export const getListSurvey = (role, id) => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await dionServer({
          url: '/survey/' + role,
          method: 'GET',
          params: {
            id_pengisi: id,
          },
        });

        if (data.survey) {
          dispatch(setSurvey(data));
          resolved('sukses');
        } else {
          rejected('terjadi kesalahan dari server');
        }
      } catch (error) {
        rejected('terjadi kesalahan dari server');
      }
    });
  };
};

export const setAnswerSurvey = payload => {
  return {
    type: SET_ANSWER_SURVEY,
    payload,
  };
};

export const kirimSurvey = body => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await dionServer({
        url: '/survey/kirim',
        method: 'POST',
        data: body,
      });

      if (data) {
        resolved('suskses');
      } else {
        rejected('terjadi kesalahan dari server');
      }
    } catch (error) {
      console.log(error);
      rejected('terjadi kesalahan dari server');
    }
  });
};

export const kirimBanyakSurvey = body => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {surveyBody, surveyOffline} = getState().surveyReducer;
        const {user} = getState().authReducer;
        const {data} = await dionServer({
          url: '/survey/banyak',
          method: 'POST',
          data: body,
        });
        if (data) {
          dispatch(
            setSurveyBody(surveyBody.filter(el => el.id_pengisi !== user.id)),
          );
          dispatch(
            setSurveyOffline(
              surveyOffline.filter(el => el.id_pengisi !== user.id),
            ),
          );
          resolved('suskses');
        } else {
          rejected('terjadi kesalahan dari server');
        }
      } catch (error) {
        rejected('terjadi kesalahan dari server');
      }
    });
  };
};

export const setSurveyOffline = payload => {
  return {
    type: SET_SURVEY_OFFLINE,
    payload,
  };
};

export const setSurveyBody = payload => {
  return {
    type: SET_SURVEY_BODY,
    payload,
  };
};

export const setPartai = payload => {
  return {
    type: SET_PARTAI,
    payload,
  };
};

export const getPartai = () => {
  return async (dispatch, getState) => {
    try {
      const {data} = await dionServer({
        url: '/partai',
        method: 'get',
      });

      dispatch(setPartai(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setSurveyKhusus = payload => {
  return {
    type: SET_SURVEY_KHUSUS,
    payload,
  };
};

export const setCaleg = payload => {
  return {
    type: SET_CALEG,
    payload,
  };
};

export const getCaleg = payload => {
  return async (dispatch, getState) => {
    try {
      let params = {};
      if (payload.id_daerah) {
        params = {
          id_daerah: payload.id_daerah,
        };
      }

      const {data} = await dionServer({
        url: '/caleg/' + payload.id_partai + '/' + payload.id_category,
        method: 'get',
        params: params,
      });

      dispatch(setCaleg(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const insertAnswerKhusus = body => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await dionServer({
        url: '/survey/khusus',
        method: 'POST',
        data: {
          data: body,
        },
      });
      if (data) {
        resolved(data);
      } else {
        rejected('gagal');
      }
    } catch (err) {
      console.log(err);
      rejected('gagal');
    }
  });
};
