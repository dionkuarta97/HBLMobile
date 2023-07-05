import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './states/store';
import {NavigationContainer} from '@react-navigation/native';
import Root from './navigations/Root';
import {NativeBaseProvider} from 'native-base';
import {getLocation} from './Helper';

const App = () => {
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
