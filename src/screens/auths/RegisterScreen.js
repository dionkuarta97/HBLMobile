import {Image, Pressable, SafeAreaView, View} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {formatEmail, heigth, passwordValidations, width} from '../../Helper';
import {useCallback, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DefaultInput from './registerComponents/DefaultInput';
import {ScrollView, Select, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from '../../states/auth/authAction';
import DefaultModal from '../../components/DefaultModal';
import LoadingModal from '../../components/ModalLoading';

const RegisterScreen = () => {
  const [dataInput, setDatainput] = useState({
    nik: '',
    nama: '',
    jk: '',
    notelp: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const [showModalSukses, setShowModalSukses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalGagal, setModalGagal] = useState(false);

  const handleChange = useCallback((e, name) => {
    setDatainput({...dataInput, [name]: e.nativeEvent.text});
  });
  const handleSelect = useCallback(val => {
    setDatainput({...dataInput, jk: val});
  });

  const handleLoading = useCallback(val => {
    setLoading(true);
  });

  const [select, setSelecet] = useState(false);

  const handleOnSelect = useCallback(val => {
    setSelecet(true);
  });

  const handleShowModalSukses = useCallback(val => {
    setShowModalSukses(val);
  });
  const handleShowModalGagal = useCallback(val => {
    setShowModalGagal(val);
  });

  const checkInput = () => {
    let temp = true;
    if (
      dataInput.nik === '' ||
      dataInput.nama === '' ||
      dataInput.jk === '' ||
      dataInput.notelp === '' ||
      !passwordValidations(dataInput.password).valid ||
      dataInput.password !== dataInput.rePassword ||
      !formatEmail(dataInput.email)
    ) {
      temp = false;
    }

    return temp;
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={globalStyles.container}>
      {showModalSukses && (
        <DefaultModal>
          <Image
            source={require('../../../assets/sukses.png')}
            style={{
              width: width / 2.5,
              height: heigth / 4,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            Sukses register
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('LoginScreen');
              handleShowModalSukses(false);
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
                width: width / 1.6,
                alignItems: 'center',
                backgroundColor: pressed
                  ? 'rgba(220, 53, 69, 0.8)'
                  : 'rgba(220, 53, 69, 1)',
                padding: 15,
                borderRadius: 8,
              },
            ]}>
            <Text color={'white'}>Masuk</Text>
          </Pressable>
        </DefaultModal>
      )}
      {showModalGagal && (
        <DefaultModal>
          <Image
            source={require('../../../assets/gagal.png')}
            style={{
              width: width / 2.5,
              height: heigth / 4,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            Terjadi kesalahan pada server
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('LoginScreen');
              handleShowModalGagal(false);
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
                width: width / 1.6,
                alignItems: 'center',
                backgroundColor: pressed
                  ? 'rgba(220, 53, 69, 0.8)'
                  : 'rgba(220, 53, 69, 1)',
                padding: 15,
                borderRadius: 8,
              },
            ]}>
            <Text color={'white'}>Tutup</Text>
          </Pressable>
        </DefaultModal>
      )}
      {loading && <LoadingModal />}
      <ScrollView
        style={{
          flexGrow: 0,
        }}>
        <KeyboardAwareScrollView
          style={{
            marginTop: heigth / 30,
            paddingHorizontal: width / 14,
          }}>
          <DefaultInput
            placeholder={'cth. 130705xxxxxxxx1'}
            label={'NIK'}
            name={'nik'}
            handleChange={handleChange}
            value={dataInput.nik}
            inputMode="numeric"
          />
          <DefaultInput
            placeholder={'cth. Franko Wangko'}
            label={'Nama Lengkap'}
            name={'nama'}
            handleChange={handleChange}
            value={dataInput.nama}
          />

          <Text
            style={{
              marginBottom: 5,
              color: 'rgba(185, 185, 185, 1)',
            }}>
            Jenis Kelamin
          </Text>
          <Select
            _selectedItem={{
              bg: 'rgba(220, 53, 69, 1)',
              _text: {
                color: 'white',
              },
            }}
            fontSize={14}
            backgroundColor={'rgba(251, 251, 251, 1)'}
            borderWidth={0.8}
            borderRadius={8}
            onOpen={() => {
              handleOnSelect();
            }}
            height={heigth / 18}
            borderColor={'rgba(214, 228, 236, 1)'}
            accessibilityLabel="pilih jenis kelamin"
            placeholder="pilih jenis kelamin"
            onValueChange={val => {
              handleSelect(val);
            }}
            selectedValue={dataInput.jk}>
            <Select.Item label="Laki - laki" value="Laki - laki" />
            <Select.Item label="Perempuan" value="Perempuan" />
          </Select>

          {select ? (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {dataInput.jk === '' ? `*jenis kelamin tidak boleh kosong` : ' '}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {' '}
            </Text>
          )}

          <DefaultInput
            placeholder={'cth.08xxxxxxxxxxx'}
            label={'Nomor handphone'}
            name={'notelp'}
            handleChange={handleChange}
            value={dataInput.notelp}
            inputMode="numeric"
          />
          <DefaultInput
            placeholder={'cth. franko.wangko@gmail.com'}
            label={'Email'}
            name={'email'}
            handleChange={handleChange}
            value={dataInput.email}
            autoCapitalize={'none'}
            inputMode="email"
          />
          <DefaultInput
            label={'Password'}
            name={'password'}
            handleChange={handleChange}
            value={dataInput.password}
            autoCapitalize={'none'}
            secureTextEntry={true}
          />
          <DefaultInput
            label={'Konfirmasi Password'}
            name={'rePassword'}
            handleChange={handleChange}
            value={dataInput.rePassword}
            autoCapitalize={'none'}
            secureTextEntry={true}
            re={dataInput.password}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      <Pressable
        disabled={!checkInput()}
        onPress={() => {
          navigation.navigate('PilihAlamatScreen', {data: dataInput});
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
            backgroundColor: !checkInput()
              ? '#B1B1B1'
              : pressed
              ? 'rgba(220, 53, 69, 0.8)'
              : 'rgba(220, 53, 69, 1)',
            padding: 15,
            borderRadius: 8,
          },
        ]}>
        <Text
          style={{
            color: 'white',
          }}>
          Selanjutnya
        </Text>
      </Pressable>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            marginRight: 3,
            color: 'rgba(150, 150, 150, 1)',
          }}>
          Sudah punya akun?
        </Text>
        <Pressable
          onPress={() => navigation.navigate('LoginScreen')}
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
            masuk
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
