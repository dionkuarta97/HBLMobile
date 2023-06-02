import dionServer from '../dionServer';
import {
  SET_LIST_PENGADUAN,
  SET_LST_PENGADUAN_OFFLINE,
  SET_TEMPAT_SIMPAN,
} from './pengaduanTypes';

export const kirimPengaduan = body => {
  return new Promise(async (resolved, rejected) => {
    try {
      const {data} = await dionServer({
        url: '/pengaduan',
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
      console.log(error);
      rejected('terjadi kesalahan pada server');
    }
  });
};

export const kirimBanyakPengaduan = body => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {tempatSimpan} = getState().pengaduanReducer;
        const {user} = getState().authReducer;
        const {data} = await dionServer({
          url: '/pengaduan/banyak',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: body,
        });

        if (data) {
          dispatch(
            setTempatSimpan(
              tempatSimpan.filter(el => el.id_pelapor !== user.id),
            ),
          );
          resolved('sukses');
        } else {
          rejected('terjadi kesalahan pada server');
        }
      } catch (error) {
        console.log(error);
        rejected('terjadi kesalahan pada server');
      }
    });
  };
};

export const setListPengaduan = payload => {
  return {
    type: SET_LIST_PENGADUAN,
    payload,
  };
};

export const getListPengaduan = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {user} = getState().authReducer;
        const {data} = await dionServer({
          url: '/pengaduan',
          method: 'GET',
          params: {
            tipe: 'aktif',
            id_pelapor: user.id,
          },
        });
        dispatch(setListPengaduan(data));
        resolved('oke');
      } catch (error) {
        console.log(error);
        rejected('terjadi kesalahan pada server');
      }
    });
  };
};

export const setListPengaduanOffline = payload => {
  return {
    type: SET_LST_PENGADUAN_OFFLINE,
    payload,
  };
};

export const getListPengaduanOffline = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {user} = getState().authReducer;
        const {data} = await dionServer({
          url: '/pengaduan',
          method: 'GET',
          params: {
            tipe: 'selesai',
            id_pelapor: user.id,
          },
        });
        dispatch(setListPengaduanOffline(data));
        resolved('oke');
      } catch (error) {
        console.log(error);
        rejected('terjadi kesalahan pada server');
      }
    });
  };
};

export const setTempatSimpan = payload => {
  return {
    type: SET_TEMPAT_SIMPAN,
    payload,
  };
};
