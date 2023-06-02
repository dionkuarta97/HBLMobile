import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {Text, View} from 'native-base';
import {useCallback, useRef, useState} from 'react';
import {launchCamera} from 'react-native-image-picker';

const KirimTugasScreen = () => {
  const route = useRoute();
  const [laporan, setLaporan] = useState('');
  const ref = useRef();
  const {detail} = route.params;
  const dateToString = useCallback(date => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });
  const handleLaporan = useCallback(val => {
    setLaporan(val);
  });

  const navigation = useNavigation();

  return (
    <SafeAreaView style={globalStyles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          ref.current?.blur();
        }}>
        <View flex={1} p={4}>
          <Text fontWeight={'bold'} fontSize={17}>
            {detail.judul}
          </Text>
          <Text>{detail.keterangan}</Text>
          <Text marginY={4} numberOfLines={1} color={'rgba(97, 97, 97, 1)'}>
            tanggal pelaksanaan: {dateToString(detail.tanggal_pelaksanaan)}
          </Text>
          <TextInput
            value={laporan}
            onChangeText={val => {
              handleLaporan(val);
            }}
            ref={ref}
            placeholder="tulis laporan disini..."
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
        onPress={async () => {
          const result = await launchCamera();
          if (result.assets) {
            navigation.navigate('RingkasanTugasScreen', {
              image: result.assets[0],
              detail: detail,
              laporan: laporan,
            });
          }
        }}
        disabled={laporan === '' ? true : false}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor:
              laporan === ''
                ? '#B1B1B1'
                : pressed
                ? 'rgba(0, 77, 153, 0.8)'
                : 'rgba(0, 77, 153, 1)',
          },
        ]}>
        <Text color={'white'}>Selanjutnya</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default KirimTugasScreen;
