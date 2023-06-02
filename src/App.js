import React from 'react';
import {Provider} from 'react-redux';
import {store} from './states/store';
import {NavigationContainer} from '@react-navigation/native';
import Root from './navigations/Root';
import {NativeBaseProvider} from 'native-base';

const App = () => {
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
