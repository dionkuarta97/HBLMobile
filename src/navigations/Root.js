import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/opening/SplashScreen';

const RootStack = createStackNavigator();

const roots = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
];

const Root = () => {
  return (
    <RootStack.Navigator>
      {roots.map(el => (
        <RootStack.Screen key={el.name} {...el} />
      ))}
    </RootStack.Navigator>
  );
};

export default Root;
