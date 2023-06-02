import {Dimensions, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NetInfo from '@react-native-community/netinfo';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Akses Lokasi',
        message: 'bisakah kami mendapat izin untuk akses lokasi?',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Batal',
        buttonPositive: 'Bisa',
      },
    );

    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const getLocation = () => {
  return new Promise((resolved, rejected) => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            resolved(position);
          },
          error => {
            rejected('error');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        rejected('a');
      }
    });
  });
};

export const checkInternet = () => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      resolve(state.isConnected);
    });
  });
};

export const width = Dimensions.get('screen').width;
export const heigth = Dimensions.get('screen').height;
export function passwordValidations(text) {
  let validasi = {
    valid: true,
    error: [],
  };
  if (text.length < 8) {
    validasi.valid = false;
    validasi.error.push('password minimal 8 karakter');
  }
  if (!text.match(new RegExp('[A-Z]'))) {
    validasi.valid = false;
    validasi.error.push('password harus mengandung huruf besar');
  }
  if (!text.match(new RegExp('[a-z]'))) {
    validasi.valid = false;
    validasi.error.push('password harus mengandung huruf kecil');
  }
  if (text.search(/[0-9]/) < 0) {
    validasi.valid = false;
    validasi.error.push('password harus mengandung angka');
  }
  return validasi;
}

export const formatEmail = email => {
  const emailReg = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/,
  );
  if (emailReg.test(email)) {
    return true;
  } else {
    return false;
  }
};
