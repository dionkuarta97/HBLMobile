import dionServer from '../dionServer';
import server from '../server';
import {
  SET_DAHSBOARD_BERITA,
  SET_DASHBOARD_DATA,
  SET_LIST_BERITA,
  SET_LOCATION,
  SET_VIDEO_ID,
  SET_JUMLAH_PEMILIH,
} from './homeTypes';

export const setDashboardData = payload => {
  return {
    type: SET_DASHBOARD_DATA,
    payload,
  };
};

export const getDashboardData = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {id, role} = getState().authReducer.user;

        const {data} = await dionServer({
          url: '/dashboard/' + role,
          method: 'GET',
          params: {id_pengisi: id},
        });

        if (data) {
          dispatch(setDashboardData(data));
          resolved('sukses');
        } else {
          rejected('kesalah dari server');
        }
      } catch (error) {
        rejected('kesalah dari server');
      }
    });
  };
};

export const setVideoId = payload => {
  return {
    type: SET_VIDEO_ID,
    payload,
  };
};

export const getVideoId = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await server({
          url: '/youtube',
          method: 'GET',
        });
        if (data[0].videoID) {
          dispatch(setVideoId(data[0].videoID));
          resolved('sukses');
        } else {
          rejected('terjadi kesalahan dari server');
        }
      } catch (err) {
        rejected('terjadi kesalahan dari server');
      }
    });
  };
};

export const setDashboardBerita = payload => {
  return {
    type: SET_DAHSBOARD_BERITA,
    payload,
  };
};

export const getDashboardBerita = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await server({
          url: '/berita',
          method: 'GET',
          params: {
            page: 1,
          },
        });
        if (data.berita) {
          dispatch(setDashboardBerita(data));
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

export const setListBerita = payload => {
  return {
    type: SET_LIST_BERITA,
    payload,
  };
};

export const getListBerita = (page, temp) => {
  return (dispatch, getState) => {
    return new Promise(async (resolved, rejected) => {
      try {
        const {data} = await server({
          url: '/berita',
          method: 'GET',
          params: {
            page: page,
            limit: 10,
          },
        });

        if (data.berita) {
          dispatch(
            setListBerita({
              total_data: data.total_data,
              berita: [...temp, ...data.berita],
            }),
          );
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

export const setLocation = payload => {
  return {
    type: SET_LOCATION,
    payload,
  };
};

export const setJumlahPemilih = payload => {
  return {
    type: SET_JUMLAH_PEMILIH,
    payload,
  };
};

export const getJumlahPemilih = () => {
  return async (dispatch, getState) => {
    try {
      const {reference_code} = getState().authReducer.user;

      const {data} = await dionServer({
        url: '/user/' + reference_code,
        method: 'GET',
      });

      dispatch(setJumlahPemilih(data));
    } catch (error) {
      console.log(error);
    }
  };
};
