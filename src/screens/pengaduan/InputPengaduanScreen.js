import {
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, View} from 'native-base';
import {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet} from '../../Helper';
import {
  kirimPengaduan,
  setTempatSimpan,
} from '../../states/pengaduan/pengaduanAction';
import LoadingModal from '../../components/ModalLoading';

const InputPengaduanScreen = () => {
  const {location} = useSelector(state => state.homeReducer);
  const {user} = useSelector(state => state.authReducer);
  const {tempatSimpan} = useSelector(state => state.pengaduanReducer);
  const route = useRoute();
  const dispatch = useDispatch();
  const [judul, setJudul] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [loading, setLoading] = useState(false);
  const handleJudul = useCallback(val => {
    setJudul(val);
  });
  const handleKeterangan = useCallback(val => {
    setKeterangan(val);
  });
  const navigation = useNavigation();
  const ref = useRef();
  const {image} = route.params;
  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      <TouchableWithoutFeedback
        onPress={() => {
          ref.current?.blur();
        }}>
        <View flex={1} padding={4}>
          <Text mb={2} color={'rgba(185, 185, 185, 1)'}>
            Judul Pengaduan
          </Text>
          <TextInput
            value={judul}
            onChangeText={val => {
              handleJudul(val);
            }}
            placeholder="tulis judul pengaduan disini..."
            style={globalStyles.inputStyle}
          />
          <Text mt={8} mb={2} color={'rgba(185, 185, 185, 1)'}>
            Pengaduan
          </Text>

          <TextInput
            value={keterangan}
            onChangeText={val => {
              handleKeterangan(val);
            }}
            ref={ref}
            placeholder="tulis pengaduan disini..."
            numberOfLines={8}
            multiline
            style={{
              paddingHorizontal: 15,
              textAlignVertical: 'top',
              width: '100%',
              borderWidth: 0.8,
              borderRadius: 5,
              borderColor: 'rgba(214, 228, 236, 1)',
              backgroundColor: 'rgba(251, 251, 251, 1)',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
      <Pressable
        onPress={() => {
          const data = new FormData();
          data.append('id_pelapor', user.id);
          data.append('judul', judul);
          data.append('keterangan', keterangan);
          data.append('latitude', location.latitude);
          data.append('longtitude', location.longtitude);
          data.append('image', {
            uri: image[0].uri,
            type: image[0].type,
            name: image[0].fileName,
          });
          setLoading(true);
          checkInternet().then(val => {
            if (val) {
              kirimPengaduan(data).finally(() => {
                setLoading(false);
              });
              navigation.navigate('PengaduanScreen', {
                onOpenPengaduan: true,
                tabActive: true,
              });
            } else {
              dispatch(
                setTempatSimpan([
                  {
                    id_local: tempatSimpan.length + 1,
                    id_pelapor: user.id,
                    judul: judul,
                    keterangan: keterangan,
                    latitude: location.latitude,
                    longtitude: location.longtitude,
                    image: {
                      uri: image[0].uri,
                      type: image[0].type,
                      name: image[0].fileName,
                    },
                  },
                  ...tempatSimpan,
                ]),
              );
              navigation.navigate('PengaduanScreen', {
                onOpenPengaduan: true,
                tabActive: true,
              });
            }
          });
        }}
        disabled={judul === '' || keterangan === '' ? true : false}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor:
              judul === '' || keterangan === ''
                ? '#B1B1B1'
                : pressed
                ? 'rgba(220, 53, 69, 0.8)'
                : 'rgba(220, 53, 69, 1)',
          },
        ]}>
        <Text color={'white'}>Kirim Pengaduan</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default InputPengaduanScreen;
