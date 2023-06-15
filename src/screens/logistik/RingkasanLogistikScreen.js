import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Pressable, SafeAreaView, ScrollView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {Text, View} from 'native-base';
import {useCallback, useState} from 'react';
import {checkInternet, width} from '../../Helper';
import LoadingModal from '../../components/ModalLoading';
import {
  kirimLogistik,
  setLogistikOffline,
} from '../../states/logistik/logistikAction';
import {useDispatch, useSelector} from 'react-redux';

const RingkasanLogistikScreen = () => {
  const route = useRoute();
  const {detail, laporan, image} = route.params;
  const [loading, setLoading] = useState(false);
  const {location} = useSelector(state => state.homeReducer);
  const {logistikOffline} = useSelector(state => state.logistikReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dateToString = useCallback(date => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  console.log(JSON.stringify(detail, null, 2));
  return (
    <>
      {loading && <LoadingModal />}
      <ScrollView
        style={{
          flex: 1,
          marginBottom: 20,
          backgroundColor: 'rgba(240, 246, 254, 1)',
        }}>
        <View bg={'white'} p={4} mb={4}>
          <View flexDirection={'row'} alignItems={'center'}>
            <View borderRadius={100} p={2} mr={2} bg={'rgba(15, 144, 200, 1)'}>
              <Image
                source={require('../../../assets/icons/logistik.png')}
                style={{
                  resizeMode: 'contain',
                  height: 20,
                  width: 20,
                }}
              />
            </View>
            <Text fontWeight={'bold'} fontSize={16}>
              Ringakasan Laporan
            </Text>
          </View>
          <View marginY={4}>
            <Text mb={1} color={'rgba(97, 97, 97, 1)'}>
              Klasifikasi
            </Text>
            <Text
              fontWeight={'semibold'}
              fontSize={16}
              mb={1}
              color={'rgba(97, 97, 97, 1)'}>
              {detail.klasifikasi}
            </Text>
            <Text mb={1} color={'rgba(97, 97, 97, 1)'}>
              Jenis Alat Peraga
            </Text>
            <Text
              fontWeight={'semibold'}
              fontSize={16}
              mb={1}
              color={'rgba(97, 97, 97, 1)'}>
              {detail.jenis}
            </Text>
            <Text mb={1} color={'rgba(97, 97, 97, 1)'}>
              Laporan
            </Text>
            <Text
              fontWeight={'semibold'}
              fontSize={16}
              mb={1}
              color={'rgba(97, 97, 97, 1)'}>
              {laporan}
            </Text>
          </View>
        </View>
        <View bg={'white'} p={4} mb={2}>
          <Image
            source={{uri: image.uri}}
            style={{
              alignSelf: 'center',
              borderRadius: 5,
              width: width / 1.1,
              height: width / 1.5,
              resizeMode: 'cover',
            }}
          />
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          const data = new FormData();
          data.append('id', detail.id);
          data.append('laporan', laporan);
          data.append('latitude', location.latitude);
          data.append('longtitude', location.longtitude);
          data.append('image', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
          setLoading(true);
          checkInternet().then(val => {
            if (val) {
              kirimLogistik(data).finally(() => {
                setLoading(false);
              });
              navigation.navigate('LogistikScreen', {onOpenLogistik: true});
            } else {
              console.log('masuk sini');
              dispatch(
                setLogistikOffline([
                  {
                    ...detail,
                    latitude: location.latitude,
                    longtitude: location.longtitude,
                    id_local: logistikOffline?.length + 1,
                    laporan: laporan,
                    image: {
                      uri: image.uri,
                      type: image.type,
                      name: image.fileName,
                    },
                  },
                  ...logistikOffline,
                ]),
              );
              setLoading(false);
              navigation.navigate('LogistikScreen', {onOpenLogistik: true});
            }
          });
        }}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor: pressed
              ? 'rgba(0, 77, 153, 0.8)'
              : 'rgba(0, 77, 153, 1)',
          },
        ]}>
        <Text color={'white'}>Kirim Logistik</Text>
      </Pressable>
    </>
  );
};

export default RingkasanLogistikScreen;
