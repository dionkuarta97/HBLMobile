import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  authReducer: persistReducer(persistConfig, authReducer),
});

export const store = createStore(reducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
