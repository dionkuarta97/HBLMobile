import {SET_USER} from './authTypes';

export const setUser = payload => {
  return {
    type: SET_USER,
    payload,
  };
};
