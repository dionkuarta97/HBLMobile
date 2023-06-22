import {View, Text, ScrollView, useToast} from 'native-base';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {checkInternet, getLocation, heigth, width} from '../../Helper';
import {useDispatch, useSelector} from 'react-redux';
import PengaturanButton from './profileComponents/PengaturanButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  getPenghubung,
  inputReferal,
  setLogin,
  setUser,
} from '../../states/auth/authAction';
import {useCallback, useState} from 'react';
import LoadingModal from '../../components/ModalLoading';
import {setLocation} from '../../states/home/homeAction';
import Clipboard from '@react-native-clipboard/clipboard';

const ProfileScreen = () => {
  const {user, penghubung} = useSelector(state => state.authReducer);
  const {location} = useSelector(state => state.homeReducer);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const handleCode = useCallback(val => {
    setCode(val);
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const OpenWEB = url => {
    Linking.openURL(url);
  };

  useFocusEffect(
    useCallback(() => {
      checkInternet().then(val => {
        if (val) {
          if (user?.referrer_to !== '') {
            dispatch(getPenghubung(user?.referrer_to)).then(() => {});
          }
        }
      });
    }, [user]),
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      <View p={4}>
        <Text fontWeight={'bold'} fontSize={18}>
          Profil
        </Text>
      </View>
      {user?.role !== 1 && (
        <View
          paddingY={4}
          alignItems={'center'}
          flexDirection={'row'}
          paddingX={8}
          bg={'rgba(220, 53, 69, 1)'}
          marginTop={2}>
          <View>
            <Text color={'white'}>Referal code</Text>
          </View>
          <Pressable
            onPress={() => {
              Clipboard.setString(user?.reference_code);
              toast.show({
                description: 'berhasil di copy',
              });
            }}
            style={({pressed}) => [
              {
                marginLeft: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                opacity: pressed ? 0.5 : 1,
                padding: 1,
              },
            ]}>
            <Text color={'white'}>{user?.reference_code}</Text>
            <Image
              source={require('../../../assets/icons/copy.png')}
              style={{
                resizeMode: 'contain',
                height: 15,
                width: 15,
                marginLeft: 7,
              }}
            />
          </Pressable>
        </View>
      )}
      <ScrollView padding={4}>
        <View
          marginY={4}
          padding={4}
          borderRadius={8}
          bg={'rgba(34, 34, 34, 1)'}>
          <Text color={'white'}>Masukan Kode Referal</Text>
          <View marginY={2} flexDirection={'row'} alignItems={'center'}>
            <TextInput
              value={code}
              onChangeText={handleCode}
              placeholder="cth. oiadjoij3425"
              style={{
                paddingHorizontal: 10,
                width: '65%',
                backgroundColor: 'white',
                height: heigth / 18,
                borderRadius: 5,
              }}
            />
            <Pressable
              disabled={code === '' ? true : false}
              onPress={() => {
                setLoading(true);
                if (location) {
                  dispatch(
                    inputReferal({
                      id: user?.id,
                      code: code,
                      latitude: location.latitude,
                      longtitude: location.longtitude,
                    }),
                  )
                    .then(val => {
                      Alert.alert('sukses', val);
                    })
                    .catch(error => {
                      console.log(error);
                      Alert.alert('error', error);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                } else {
                  getLocation()
                    .then(async data => {
                      if (data) {
                        dispatch(
                          setLocation({
                            latitude: data.coords.latitude,
                            longtitude: data.coords.longitude,
                          }),
                        );
                        dispatch(
                          inputReferal({
                            id: user?.id,
                            code: code,
                            latitude: data.coords.latitude,
                            longtitude: data.coords.longitude,
                          }),
                        )
                          .then(val => {
                            Alert.alert('sukses', val);
                          })
                          .catch(error => {
                            console.log(error);
                            Alert.alert('error', error);
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      }
                    })
                    .catch(err => {
                      Alert.alert(
                        'Warning',
                        'Anda perlu mengaktifkan perizinan lokasi untuk melakukan survey',
                      );
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }
              }}
              style={({pressed}) => [
                {
                  width: '30%',
                  height: heigth / 18,
                  marginLeft: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor:
                    code === ''
                      ? '#B1B1B1'
                      : pressed
                      ? 'rgba(220, 53, 69, 0.8)'
                      : 'rgba(220, 53, 69, 1)',
                },
              ]}>
              <Text fontWeight={'semibold'} color={'white'}>
                Sambung
              </Text>
            </Pressable>
          </View>
        </View>
        {user?.referrer_to !== '' && (
          <View
            borderWidth={0.8}
            borderColor={'rgba(220, 53, 69, 1)'}
            borderRadius={8}
            p={4}>
            <Text>Behasil Tersambung</Text>
            <Text fontWeight={'semibold'}>
              {penghubung?.jk === 'Laki - laki' ? 'Bapak' : 'Ibu'}
              {' ' + penghubung?.nama}{' '}
            </Text>
            <Pressable
              onPress={() => {
                OpenWEB('https://wa.me/' + penghubung.notelp);
              }}
              style={({pressed}) => [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: pressed
                    ? 'rgba(0, 195, 20, 0.7)'
                    : 'rgba(0, 195, 20, 1)',
                  paddingVertical: 10,
                  borderRadius: 8,
                  marginTop: 10,
                },
              ]}>
              <Image
                source={require('../../../assets/icons/wa.png')}
                style={{
                  resizeMode: 'contain',
                  width: 20,
                  height: 20,
                  marginRight: 10,
                }}
              />
              <Text color={'white'} fontWeight={'semibold'}>
                Hubungi
              </Text>
            </Pressable>
          </View>
        )}
        <Text color={'rgba(117, 117, 117, 1)'} mt={2}>
          Pengaturan
        </Text>
        <View marginY={5}>
          <PengaturanButton name={'Ganti Password'} />
          <PengaturanButton name={'Pusat Bantuan'} />
        </View>
        <PengaturanButton
          onPress={() => {
            navigation.replace('LoginScreen');
            dispatch(setUser(null));
            dispatch(setLogin(false));
          }}
          name={'Log out'}
        />
        <View
          mb={8}
          mt={heigth / 10}
          alignItems={'center'}
          paddingY={4}
          paddingX={12}>
          <Image
            source={require('../../../assets/headerLogin.png')}
            style={{
              width: width / 2,
              resizeMode: 'contain',
              height: heigth / 18,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
