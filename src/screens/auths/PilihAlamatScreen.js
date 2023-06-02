import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert, Image, Pressable, SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import SelectKabupaten from './PilihAlamatComponents/SelectKabupaten';
import {View, Text} from 'native-base';
import {useCallback, useState} from 'react';
import SelectKecamatan from './PilihAlamatComponents/SelectKecamatan';
import SelectKelurahan from './PilihAlamatComponents/SelectKelurahan';
import {TextInput} from 'react-native-gesture-handler';
import {heigth, width} from '../../Helper';
import DefaultModal from '../../components/DefaultModal';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../states/auth/authAction';
import OnTapTextInput from '../../components/OnTapTextInput';

const PilihAlamatScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data} = route.params;
  const [idKabKota, setIdKabKota] = useState(null);
  const [idKecamatan, setIdKecamatan] = useState(null);
  const [idKelurahan, setIdKelurahan] = useState(null);
  const [alamat, setAlamat] = useState('');
  const [showModalSukses, setShowModalSukses] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showKab, setShowKab] = useState(false);
  const [showKec, setShowKec] = useState(false);
  const [showKel, setShowKel] = useState(false);

  const handleKab = useCallback(val => {
    setShowKab(val);
  });
  const handleKec = useCallback(val => {
    setShowKec(val);
  });
  const handleKel = useCallback(val => {
    setShowKel(val);
  });

  const handleLoading = useCallback(val => {
    setLoading(true);
  });
  const handleChangeIdKabKota = useCallback(val => {
    setIdKabKota(val);
  });
  const handleChangeIdKecamatan = useCallback(val => {
    setIdKecamatan(val);
  });
  const handleChangeIdKelurahan = useCallback(val => {
    setIdKelurahan(val);
  });

  const handleChangeAlamat = useCallback(val => {
    setAlamat(val);
  });

  const handleShowModalSukses = useCallback(val => {
    setShowModalSukses(val);
  });

  const checkInput = () => {
    let temp = true;
    if (
      idKabKota === null ||
      idKecamatan === null ||
      idKelurahan === null ||
      alamat === ''
    ) {
      temp = false;
    }

    return temp;
  };

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
                  ? 'rgba(0, 77, 153, 0.8)'
                  : 'rgba(0, 77, 153, 1)',
                padding: 15,
                borderRadius: 8,
              },
            ]}>
            <Text color={'white'}>Masuk</Text>
          </Pressable>
        </DefaultModal>
      )}
      <View flex={1} p={4}>
        <Text
          style={{
            marginBottom: 5,
            color: 'rgba(185, 185, 185, 1)',
          }}>
          Kabupaten / Kota
        </Text>
        <OnTapTextInput
          placeholder="Pilih Kabupaten"
          value={idKabKota ? idKabKota : ''}
          onTap={() => {
            handleKab(true);
          }}
        />
        {showKab && (
          <SelectKabupaten
            onClose={() => handleKab(false)}
            onSelect={value => {
              console.log(value);
              handleChangeIdKabKota(value);
              handleKab(false);
            }}
          />
        )}
        <Text
          style={{
            marginTop: 8,
            marginBottom: 5,
            color: 'rgba(185, 185, 185, 1)',
          }}>
          Kecamatan
        </Text>
        <OnTapTextInput
          placeholder="Pilih Kecamatan"
          value={idKecamatan ? idKecamatan : ''}
          onTap={() => {
            if (idKabKota) {
              handleKec(true);
            } else {
              Alert.alert('warning', 'pilih kabupaten terlebih dahulu');
            }
          }}
        />
        {showKec && (
          <SelectKecamatan
            id={idKabKota?.id}
            onClose={() => handleKec(false)}
            onSelect={value => {
              handleChangeIdKecamatan(value);
              handleKec(false);
            }}
          />
        )}
        <Text
          style={{
            marginTop: 8,
            marginBottom: 5,
            color: 'rgba(185, 185, 185, 1)',
          }}>
          Kelurahan
        </Text>
        <OnTapTextInput
          placeholder="Pilih Kelurahan"
          value={idKelurahan ? idKelurahan : ''}
          onTap={() => {
            if (idKecamatan) {
              handleKel(true);
            } else {
              Alert.alert('warning', 'pilih kecamatan terlebih dahulu');
            }
          }}
        />
        {showKel && (
          <SelectKelurahan
            id={idKecamatan?.id}
            onClose={() => handleKel(false)}
            onSelect={value => {
              handleChangeIdKelurahan(value);
              handleKel(false);
            }}
          />
        )}
        <Text
          style={{
            marginTop: 8,
            marginBottom: 5,
            color: 'rgba(185, 185, 185, 1)',
          }}>
          Alamat
        </Text>
        <TextInput
          value={alamat}
          onChangeText={val => {
            handleChangeAlamat(val);
          }}
          placeholder="cth. Jalan Buntu 31"
          style={[globalStyles.inputStyle]}
        />
        <Pressable
          disabled={!checkInput()}
          onPress={() => {
            handleLoading(true);
            registerUser({
              ...data,
              id_kabupaten_kota: idKabKota.id,
              id_kecamatan: idKecamatan.id,
              id_kelurahan: idKelurahan.id,
              alamat: alamat,
            })
              .then(data => {
                handleShowModalSukses(true);
              })
              .catch(err => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          style={({pressed}) => [
            {
              transform: [
                {
                  scale: pressed ? 0.99 : 1,
                },
              ],
              alignSelf: 'center',
              marginTop: heigth / 7,
              width: width / 1.2,
              alignItems: 'center',
              backgroundColor: !checkInput()
                ? '#B1B1B1'
                : pressed
                ? 'rgba(0, 77, 153, 0.8)'
                : 'rgba(0, 77, 153, 1)',
              padding: 15,
              borderRadius: 8,
            },
          ]}>
          <Text
            style={{
              color: 'white',
            }}>
            Daftar
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
                  ? 'rgba(0, 77, 153, 1)'
                  : 'rgba(0, 77, 153, 0)',
              },
            ]}>
            <Text
              style={{
                color: 'rgba(0, 77, 153, 1)',
              }}>
              masuk
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PilihAlamatScreen;
