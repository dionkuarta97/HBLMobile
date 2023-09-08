import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './states/store';
import {NavigationContainer} from '@react-navigation/native';
import Root from './navigations/Root';
import {NativeBaseProvider} from 'native-base';
import {getLocation} from './Helper';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({});

const App = () => {
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
