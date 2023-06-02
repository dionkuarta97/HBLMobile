import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

export const checkStorage = (key, val, type) => {
  let temp = null;
  if (type === 'boolean') {
    return storage.getBoolean(key) ?? val;
  } else if (type === 'string') {
    temp = storage.getString(key);

    if (temp) return JSON.parse(temp);
    else return val;
  }
};

export const setStorage = (key, newVal) => {
  storage.set(key, newVal);
};
