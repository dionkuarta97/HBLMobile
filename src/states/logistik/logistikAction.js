import dionServer from '../dionServer';
import {
  SET_LIST_LOGISTIK,
  SET_LOGISTIK_OFFLINE,
  SET_LOGISTIK_SELESAI,
} from './logistikTypes';

export const setLogistikAktif = payload => {
  return {
    type: SET_LIST_LOGISTIK,
    payload,
  };
};

export const setLogistikOffline = payload => {
  return {
    type: SET_LOGISTIK_OFFLINE,
    payload,
  };
};

export const getLogistikAktif = () => {
  return async (dispatch, getState) => {
    try {
      const {id} = getState().authReducer.user;
      const {data} = await dionServer({
        url: '/logistik/' + id,
        method: 'GET',
        params: {
          tipe: 'aktif',
        },
      });
      dispatch(setLogistikAktif(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setLogistikSelesai = payload => {
  return {
    type: SET_LOGISTIK_SELESAI,
    payload,
  };
};

export const getLogistikSelesai = () => {
  return async (dispatch, getState) => {
    try {
      const {id} = getState().authReducer.user;
      const {data} = await dionServer({
        url: '/logistik/' + id,
        method: 'GET',
        params: {
          tipe: 'selesai',
        },
      });
      dispatch(setLogistikSelesai(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const kirimLogistik = body => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await dionServer({
        url: '/logistik',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: body,
      });

      if (data) {
        resolved('sukses');
      } else {
        rejected('terjadi kesalahan pada server');
      }
    } catch (error) {
      rejected('terjadi kesalahan pada server');
    }
  });
};
