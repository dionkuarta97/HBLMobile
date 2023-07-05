import dionServer from '../dionServer';
import server from '../server';
import {SET_BANTUAN, SET_LOGIN, SET_REFERAL, SET_USER} from './authTypes';

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  };
};

export const setLogin = payload => {
  return {
    type: SET_LOGIN,
    payload,
  };
};

export const setPenghubung = payload => {
  return {
    type: SET_REFERAL,
    payload,
  };
};

export const registerUser = body => {
  return new Promise(async (resolved, rejected) => {
    try {
      console.log(JSON.stringify(body, null, 2));
      const {data} = await server({
        url: '/user',
        method: 'POST',
        data: body,
      });
      resolved(data);
    } catch (error) {
      rejected(error);
    }
  });
};

export const loginUser = body => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await server({
          url: '/user_login',
          method: 'POST',
          data: body,
        });
        if (data.status) {
          rejected(data.status);
        } else {
          dispatch(setUser(data[0]));
          resolved(data);
        }
      } catch (error) {
        rejected('terjadi kesalahan pada server');
      }
    });
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      const {user} = getState().authReducer;

      const {data} = await server({
        url: '/user',
        method: 'GET',
        params: {
          id: user.id,
        },
      });
      dispatch(setUser(data[0]));
    } catch (error) {}
  };
};

export const inputReferal = body => {
  return async (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await dionServer({
          url: '/user/referal',
          method: 'POST',
          data: body,
        });
        dispatch(getUser());
        resolved(data.message);
      } catch (error) {
        if (error.response.data) {
          rejected(error.response.data.message);
        } else rejected('terjadi kesalahan pada server');
      }
    });
  };
};

export const getPenghubung = code => {
  return async (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await dionServer({
          url: '/user/referal',
          method: 'GET',
          params: {
            code: code,
          },
        });

        dispatch(setPenghubung(data));
        resolved('oe');
      } catch (error) {
        rejected('terjadi kesalahan pada server');
      }
    });
  };
};

export const getKabupatenKota = () => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await server({
        url: '/kabupaten_kota',
        method: 'GET',
      });
      if (Array.isArray(data)) {
        resolved(data);
      } else {
        rejected('terjadi kesalahan pada server');
      }
    } catch (error) {
      rejected('terjadi kesalahan pada server');
    }
  });
};

export const getKecamatan = payload => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await server({
        url: '/kecamatan',
        method: 'GET',
        params: {
          id: payload,
        },
      });
      if (Array.isArray(data)) {
        resolved(data);
      } else {
        rejected('terjadi kesalahan pada server');
      }
    } catch (error) {
      rejected('terjadi kesalahan pada server');
    }
  });
};

export const getKelurahan = payload => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await server({
        url: '/kelurahan',
        method: 'GET',
        params: {
          id: payload,
        },
      });

      if (Array.isArray(data)) {
        resolved(data);
      } else {
        rejected('terjadi kesalahan pada server');
      }
    } catch (error) {
      rejected('terjadi kesalahan pada server');
    }
  });
};

export const setBantuan = payload => {
  return {
    type: SET_BANTUAN,
    payload,
  };
};

export const getBantuan = () => {
  return async (dispatch, getState) => {
    try {
      const {data} = await dionServer({
        url: '/bantuan',
        method: 'GET',
      });
      dispatch(setBantuan(data));
    } catch (error) {
      console.log(error);
    }
  };
};
