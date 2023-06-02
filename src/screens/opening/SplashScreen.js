import {Image, SafeAreaView, StyleSheet} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {heigth, width} from '../../Helper';
import LinearGradient from 'react-native-linear-gradient';
import splashScreenMiddle from '../../../assets/splashScreenMiddle.png';
import splashScreenBot from '../../../assets/splashScreenBot.png';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
const SplashScreen = () => {
  const {isLogin, user} = useSelector(state => state.authReducer);
  const navigation = useNavigation();
  console.log(isLogin);
  useEffect(() => {
    if (!isLogin) {
      setTimeout(() => {
        navigation.replace('LoginScreen');
      }, 1500);
    } else {
      setTimeout(() => {
        navigation.replace('BottomRouter', {
          screen: 'HomeRouter',
          params: {
            screen: 'HomeScreen',
          },
        });
      }, 1500);
    }
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <LinearGradient
        colors={['#004D99', '#03417E']}
        style={style.linearGradientStyle}>
        <Image
          style={style.splashScreenMiddleStyle}
          source={splashScreenMiddle}
        />
        <Image style={style.splashScreenBotStyle} source={splashScreenBot} />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  linearGradientStyle: {
    flex: 1,
    alignItems: 'center',
  },
  splashScreenMiddleStyle: {
    width: width / 3,
    resizeMode: 'contain',
    height: heigth / 6,
    flex: 1,
  },
  splashScreenBotStyle: {
    width: width,
    height: heigth / 4,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
});
