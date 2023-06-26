import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {default as globalStyles} from '../../GlobalStyles';
import {heigth, width} from '../../Helper';

import headerLogin from '../../../assets/headerLogin.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useRef, useState} from 'react';
import LoadingModal from '../../components/ModalLoading';
import {loginUser, setLogin} from '../../states/auth/authAction';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const refEmail = useRef();
  const refPassword = useRef();
  const handleLoading = useCallback(val => {
    setLoading(val);
  });
  const handleChangeEmail = useCallback(val => {
    setEmail(val);
  });
  const handleError = useCallback(val => {
    setError(val);
  });

  const handleChangePassword = useCallback(val => {
    setPassword(val);
  });
  useFocusEffect(
    useCallback(() => {
      return () => {
        setError(null);
        setEmail('');
        setPassword('');
      };
    }, []),
  );

  const navigation = useNavigation();
  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      <TouchableWithoutFeedback
        onPress={() => {
          refEmail.current?.blur();
          refPassword.current?.blur();
        }}>
        <View>
          <Image source={headerLogin} style={style.headerImg} />
          <View style={style.viewFrom}>
            <Text style={style.textStyle}>Email</Text>
            <TextInput
              ref={refEmail}
              onChangeText={val => {
                handleChangeEmail(val);
              }}
              value={email}
              inputMode="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              style={globalStyles.inputStyle}
            />
            <Text style={style.textStyle}>Password</Text>
            <TextInput
              ref={refPassword}
              value={password}
              onChangeText={val => {
                handleChangePassword(val);
              }}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              style={globalStyles.inputStyle}
            />
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {error ? error : ' '}
            </Text>
            <Pressable
              style={({pressed}) => [
                {
                  alignSelf: 'flex-end',
                  marginTop: 15,
                  borderBottomWidth: 1,
                  borderColor: pressed
                    ? 'rgba(220, 53, 69, 1)'
                    : 'rgba(220, 53, 69, 0)',
                },
              ]}>
              <Text
                style={{
                  color: 'rgba(150, 150, 150, 1)',
                }}>
                Lupa Password?
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              if (email !== '' && password !== '') {
                handleLoading(true);
                dispatch(loginUser({email, password}))
                  .then(() => {
                    dispatch(setLogin(true));
                  })
                  .then(val => {
                    navigation.replace('BottomRouter', {
                      screen: 'HomeRouter',
                      params: {screen: 'HomeScreen'},
                    });
                  })
                  .catch(err => {
                    handleError(err);
                  })
                  .finally(() => {
                    handleLoading(false);
                  });
              }
            }}
            style={({pressed}) => [
              {
                transform: [
                  {
                    scale: pressed ? 0.99 : 1,
                  },
                ],
                alignSelf: 'center',
                marginTop: heigth / 20,
                width: width / 1.2,
                alignItems: 'center',
                backgroundColor: pressed
                  ? 'rgba(220, 53, 69, 0.8)'
                  : 'rgba(220, 53, 69, 1)',
                padding: 15,
                borderRadius: 8,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Masuk
            </Text>
          </Pressable>
          <View
            style={{
              alignItems: 'center',
              marginTop: heigth / 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginRight: 3,
                color: 'rgba(150, 150, 150, 1)',
              }}>
              Belum punya akun?
            </Text>
            <Pressable
              onPress={() => navigation.navigate('RegisterScreen')}
              style={({pressed}) => [
                {
                  borderBottomWidth: 1,
                  borderColor: pressed
                    ? 'rgba(220, 53, 69, 1)'
                    : 'rgba(220, 53, 69, 0)',
                },
              ]}>
              <Text
                style={{
                  color: 'rgba(220, 53, 69, 1)',
                }}>
                daftar
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  headerImg: {
    width: width / 2.3,
    height: heigth / 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: heigth / 8,
  },
  viewFrom: {
    paddingHorizontal: width / 10,
    marginTop: heigth / 18,
  },
  textStyle: {
    color: 'rgba(185, 185, 185, 1)',
    marginBottom: 5,
    marginTop: 15,
  },
});
