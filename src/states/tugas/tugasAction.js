import dionServer from '../dionServer';
import {
  SET_LIST_SELESAI,
  SET_LIST_TUGAS,
  SET_TUGAS_OFFLINE,
} from './tugasTypes';

export const setListTugas = payload => {
  return {
    type: SET_LIST_TUGAS,
    payload,
  };
};

export const setTugasOffline = payload => {
  return {
    type: SET_TUGAS_OFFLINE,
    payload,
  };
};

export const getListTugas = () => {
  return async (dispatch, getState) => {
    try {
      const {id} = getState().authReducer.user;
      const {data} = await dionServer({
        url: '/tugas/' + id,
        method: 'GET',
        params: {
          tipe: 'aktif',
        },
      });
      dispatch(setListTugas(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setListTugasSelesai = payload => {
  return {
    type: SET_LIST_SELESAI,
    payload,
  };
};

export const getListTugasSelesai = () => {
  return async (dispatch, getState) => {
    try {
      const {id} = getState().authReducer.user;
      const {data} = await dionServer({
        url: '/tugas/' + id,
        method: 'GET',
        params: {
          tipe: 'selesai',
        },
      });
      dispatch(setListTugasSelesai(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const kirimTugas = body => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await dionServer({
        url: '/tugas',
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
