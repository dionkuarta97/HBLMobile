import React, {useCallback, useState} from 'react';
import {Text, Dimensions, StyleSheet, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const DefaultTabBar = props => {
  const [index, setIndex] = useState(props.tab ? props.tab : 0);
  const [routes] = useState(props.routes);

  const handleChangeIndex = useCallback(val => {
    setIndex(val);
  });

  const renderScene = ({route, jumpTo}) => {
    return props.screen[index];
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={val => {
        handleChangeIndex(val);
        props.onIndexChange(val);
      }}
      renderTabBar={item => (
        <TabBar
          {...item}
          indicatorStyle={{backgroundColor: 'rgba(220, 53, 69, 1)'}}
          tabStyle={{
            width: Dimensions.get('window').width / routes.length,
          }}
          style={{backgroundColor: 'white'}}
          renderLabel={({route, focused, color}) => (
            <Text
              style={{
                color: focused ? 'rgba(220, 53, 69, 1)' : '#9B9B9B',
                fontSize: Dimensions.get('screen').width / 27,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default DefaultTabBar;
