import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/profiles/ProfileScreen';
import PusatBantuanScreen from '../screens/profiles/PusatBantuanScreen';
import DetailBantuanScreen from '../screens/profiles/DetailBantuanScreen';

const ProfileStack = createStackNavigator();

const homes = [
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'PusatBantuanScreen',
    component: PusatBantuanScreen,
    options: {
      title: 'Pusat Bantuan',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
    },
  },
  {
    name: 'DetailBantuanScreen',
    component: DetailBantuanScreen,
    options: {
      title: 'Pusat Bantuan',
      headerStyle: {backgroundColor: 'white', height: 60, elevation: 0},
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
