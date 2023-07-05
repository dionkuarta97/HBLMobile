import {View, Text, ScrollView, useToast, Center, HStack} from 'native-base';
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
import ImageView from 'react-native-image-viewing';
import {
  checkReferal,
  getPenghubung,
  inputReferal,
  setLogin,
  setUser,
} from '../../states/auth/authAction';
import {useCallback, useState} from 'react';
import LoadingModal from '../../components/ModalLoading';
import {setLocation} from '../../states/home/homeAction';
import Clipboard from '@react-native-clipboard/clipboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DefaultModal from '../../components/DefaultModal';

const ProfileScreen = () => {
  const {user, penghubung} = useSelector(state => state.authReducer);
  const {location} = useSelector(state => state.homeReducer);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  const handleCode = useCallback(val => {
    setCode(val);
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const OpenWEB = url => {
    Linking.openURL(url);
  };

  useFocusEffect(
    useCallback(() => {
      setCode('');
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
      <View alignItems={'center'} flexDirection={'row'} px={10} py={4}>
        <Text
          width={'50%'}
          mr={'auto'}
          numberOfLines={1}
          fontWeight={'semibold'}>
          Halo,{' '}
          <Text fontWeight={'normal'}>
            {user?.jk === 'Laki - laki' ? 'Bapak' : 'ibu'} {user?.nama}
          </Text>
        </Text>
        <TouchableOpacity
          onPress={async () => {
            setVisible(true);
          }}>
          {user?.path === '' ? (
            <Image
              source={require('../../../assets/icons/profile-active.png')}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
              }}
            />
          ) : (
            <Image
              source={{uri: user?.path}}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      {user?.path === '' ? (
        <ImageView
          images={[require('../../../assets/icons/profile-active.png')]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      ) : (
        <ImageView
          images={[{uri: user?.path}]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      )}
      {user?.role !== '1' && (
        <View
          paddingY={4}
          alignItems={'center'}
          flexDirection={'row'}
          paddingX={8}
          bg={'rgba(220, 53, 69, 1)'}>
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
                checkInternet().then(connect => {
                  if (connect) {
                    if (location) {
                      dispatch(
                        checkReferal({
                          id: user?.id,
                          code: code,
                          latitude: location.latitude,
                          longtitude: location.longtitude,
                        }),
                      )
                        .then(val => {
                          if (val === 'relawan') {
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
                              .finally(() => {
                                setLoading(false);
                              });
                          } else {
                            setShowModal(true);
                          }
                        })
                        .catch(error => {
                          console.log(error);
                          Alert.alert('error', error);
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
                              checkReferal({
                                id: user?.id,
                                code: code,
                                latitude: location.latitude,
                                longtitude: location.longtitude,
                              }),
                            )
                              .then(val => {
                                if (val === 'relawan') {
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
                                    .finally(() => {
                                      setLoading(false);
                                    });
                                } else {
                                  setShowModal(true);
                                }
                              })
                              .catch(error => {
                                console.log(error);
                                Alert.alert('error', error);
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
                  } else {
                    setLoading(false);
                    Alert.alert(
                      'Warning',
                      'untuk memasukan kode referal membutuhkan koneksi internet',
                    );
                  }
                });
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
        {showModal && (
          <DefaultModal width={width / 1.1}>
            <Center>
              <Text fontWeight={'semibold'} textAlign={'center'}>
                Anda wajid meng-upload foto, karna anda terhubung koordinator
              </Text>
            </Center>
            <Text mt={4}>Tampilan Gambar</Text>
            {!image ? (
              <View
                my={4}
                bg={'rgba(244, 244, 244, 1)'}
                width={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                height={heigth / 4}>
                <Image
                  source={require('../../../assets/no-gambar.png')}
                  style={{
                    height: 70,
                    width: 130,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            ) : (
              <Image
                source={{uri: image.uri}}
                style={{
                  marginVertical: 10,
                  width: '100%',
                  height: heigth / 4,
                  resizeMode: 'contain',
                }}
              />
            )}
            <HStack my={4} space={2} alignItems={'center'}>
              <Pressable
                onPress={async () => {
                  const result = await launchImageLibrary();
                  setImage({
                    fileName: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                  });
                }}
                style={({pressed}) => [
                  {
                    transform: [
                      {
                        scale: pressed ? 0.99 : 1,
                      },
                    ],
                    width: '45%',
                    backgroundColor: 'rgba(220, 53, 69, 1)',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderRadius: 8,
                  },
                ]}>
                <Text color={'white'}>Buka Gallery</Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  const result = await launchCamera();
                  setImage({
                    fileName: result.assets[0].fileName,
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                  });
                }}
                style={({pressed}) => [
                  {
                    transform: [
                      {
                        scale: pressed ? 0.99 : 1,
                      },
                    ],
                    marginLeft: 'auto',
                    width: '45%',
                    borderWidth: 1,
                    borderColor: 'rgba(220, 53, 69, 1)',
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderRadius: 8,
                  },
                ]}>
                <Text color={'rgba(220, 53, 69, 1)'}>Buka Kamera</Text>
              </Pressable>
            </HStack>
            <Pressable
              onPress={() => {
                setLoading(true);
                const data = new FormData();
                data.append('id', user?.id);
                data.append('code', code);
                data.append('latitude', location.latitude);
                data.append('longtitude', location.longtitude);
                data.append('image', {
                  uri: image.uri,
                  type: image.type,
                  name: image.fileName,
                });
                dispatch(inputReferal(data))
                  .then(val => {
                    Alert.alert('sukses', val);
                  })
                  .catch(error => {
                    console.log(error);
                    Alert.alert('error', error);
                  })
                  .finally(() => {
                    setShowModal(false);
                    setLoading(false);
                  });
              }}
              disabled={!image ? true : false}
              style={({pressed}) => [
                {
                  transform: [
                    {
                      scale: pressed ? 0.99 : 1,
                    },
                  ],
                  backgroundColor: !image ? '#B1B1B1' : 'rgba(0, 195, 20, 1)',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderRadius: 8,
                },
              ]}>
              <Text color={'white'}>Upload Gambar</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowModal(false);
              }}
              style={({pressed}) => [
                {
                  marginTop: 10,
                  transform: [
                    {
                      scale: pressed ? 0.99 : 1,
                    },
                  ],
                  borderWidth: 1,
                  borderColor: 'black',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderRadius: 8,
                },
              ]}>
              <Text color={'black'}>Tutup</Text>
            </Pressable>
          </DefaultModal>
        )}
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
        <View marginTop={3} mb={8}>
          <PengaturanButton
            onPress={() => {
              navigation.navigate('PusatBantuanScreen');
            }}
            name={'Pusat Bantuan'}
          />
        </View>
        <PengaturanButton
          onPress={() => {
            navigation.replace('LoginScreen');
            dispatch(setUser(null));
            dispatch(setLogin(false));
          }}
          name={'Log out'}
        />
        <View mb={8} mt={8} alignItems={'center'} paddingY={5} paddingX={12}>
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
