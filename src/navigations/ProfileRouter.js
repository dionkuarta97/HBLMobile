import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/profiles/ProfileScreen';

const ProfileStack = createStackNavigator();

const homes = [
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    options: {
      headerShown: false,
    },
  },
];

const ProfileRouter = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}>
      {homes.map(el => (
        <ProfileStack.Screen key={el.name} {...el} />
      ))}
    </ProfileStack.Navigator>
  );
};

export default ProfileRouter;
