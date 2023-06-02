import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeRouter from './HomeRouter';
import ProfileRouter from './ProfileRouter';
import {Image} from 'react-native';
import {Text} from 'native-base';

const Tab = createBottomTabNavigator();

const menus = [
  {
    name: 'HomeRouter',
    component: HomeRouter,
    options: {
      headerShown: false,
      tabBarLabel: ({focused}) => {
        return (
          <Text
            fontSize={13}
            mb={2}
            color={focused ? 'rgba(0, 77, 153, 1)' : 'black'}>
            Home
          </Text>
        );
      },
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={
              focused
                ? require('../../assets/icons/home-active.png')
                : require('../../assets/icons/home.png')
            }
            style={{
              marginTop: 4,
              width: 30,
              height: 30,
              resizeMode: 'contain',
              transform: [{scale: focused ? 1.1 : 1}],
            }}
          />
        );
      },
    },
  },
  {
    name: 'ProfileRouter',
    component: ProfileRouter,
    options: {
      headerShown: false,
      tabBarLabel: ({focused}) => {
        return (
          <Text
            mb={2}
            fontSize={13}
            color={focused ? 'rgba(0, 77, 153, 1)' : 'black'}>
            Profil
          </Text>
        );
      },
      tabBarIcon: ({focused}) => {
        return (
          <Image
            source={
              focused
                ? require('../../assets/icons/profile-active.png')
                : require('../../assets/icons/profile.png')
            }
            style={{
              marginTop: 4,
              width: 30,
              height: 30,
              resizeMode: 'contain',
              transform: [{scale: focused ? 1.1 : 1}],
            }}
          />
        );
      },
    },
  },
];

const BottomRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 65,
        },
      }}>
      {menus.map(el => (
        <Tab.Screen key={el.name} {...el} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomRouter;
