import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SplashScreen from '../screens/opening/SplashScreen';
import LoginScreen from '../screens/auths/LoginScreen';
import RegisterScreen from '../screens/auths/RegisterScreen';
import BottomRouter from './BottomRouter';
import PilihAlamatScreen from '../screens/auths/PilihAlamatScreen';

const RootStack = createStackNavigator();

const roots = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'LoginScreen',
    component: LoginScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
    options: {
      title: 'Daftar Akun Baru',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'PilihAlamatScreen',
    component: PilihAlamatScreen,
    options: {
      title: 'Daftar Akun Baru',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'BottomRouter',
    component: BottomRouter,
    options: {
      headerShown: false,
    },
  },
];

const Root = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {roots.map(el => (
        <RootStack.Screen key={el.name} {...el} />
      ))}
    </RootStack.Navigator>
  );
};

export default Root;
