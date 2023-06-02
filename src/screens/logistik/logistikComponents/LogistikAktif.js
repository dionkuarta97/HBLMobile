import {View, Text, ScrollView} from 'native-base';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Pressable, Image, Alert} from 'react-native';
import {checkInternet, getLocation, heigth} from '../../../Helper';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getLogistikAktif} from '../../../states/logistik/logistikAction';
import BottomLogistik from './BottomLogistik';
import LoadingModal from '../../../components/ModalLoading';
import {setLocation} from '../../../states/home/homeAction';

const LogistikAktif = () => {
  const {listLogistikAktif, logistikOffline} = useSelector(
    state => state.logistikReducer,
  );
  const {location} = useSelector(state => state.homeReducer);
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      checkInternet().then(val => {
        if (val) {
          dispatch(getLogistikAktif());
        }
      });
    }, []),
  );
  const dateToString = useCallback(date => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });
  return (
    <ScrollView p={4}>
      {loading && <LoadingModal />}
      {route.params?.onOpenLogistik && (
        <BottomLogistik
          isOpen={route.params?.onOpenLogistik}
          onClose={() => {
            navigation.setParams({onOpenLogistik: false});
          }}
        />
      )}
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {
          listLogistikAktif?.filter(
            el => !logistikOffline.find(({id}) => el.id === id) && el,
          ).length
        }{' '}
        tugas
      </Text>
      {listLogistikAktif
        ?.filter(el => !logistikOffline.find(({id}) => el.id === id) && el)
        .map((el, idx) => (
          <Pressable
            onPress={() => {
              setLoading(true);
              checkInternet().then(async val => {
                if (val) {
                  getLocation()
                    .then(async data => {
                      if (data) {
                        dispatch(
                          setLocation({
                            latitude: data.coords.latitude,
                            longtitude: data.coords.longitude,
                          }),
                        );
                        navigation.navigate('KirimLogistikScreen', {
                          detail: el,
                        });
                      }
                    })
                    .catch(err => {
                      Alert.alert(
                        'Warning',
                        'Anda perlu mengaktifkan perizinan lokasi',
                      );
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                } else {
                  if (location) {
                    navigation.navigate('KirimLogistikScreen', {
                      detail: el,
                    });
                  } else {
                    Alert.alert('warning', 'anda perlu memberi izin lokasi');
                  }
                  setLoading(false);
                }
              });
            }}
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingVertical: 10,
                opacity: pressed ? 0.5 : 1,
                marginBottom:
                  idx + 1 ===
                  listLogistikAktif?.filter(
                    el => !logistikOffline.find(({id}) => el.id === id) && el,
                  ).length
                    ? heigth / 15
                    : 0,
                borderColor:
                  idx + 1 ===
                  listLogistikAktif?.filter(
                    el => !logistikOffline.find(({id}) => el.id === id) && el,
                  ).length
                    ? 'rgba(224, 224, 224, 0)'
                    : 'rgba(224, 224, 224, 1)',
              },
            ]}
            key={idx + 'asas'}>
            <View padding={2} borderRadius={50} bg={'rgba(15, 144, 200, 1)'}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                }}
                source={require('../../../../assets/icons/logistik.png')}
              />
            </View>
            <View width={'75%'} ml={4}>
              <Text numberOfLines={1} fontWeight={'semibold'}>
                {el.nama}
              </Text>
              <Text numberOfLines={1} color={'rgba(97, 97, 97, 1)'}>
                Batas akhir: {dateToString(el.deadline)}
              </Text>
            </View>
          </Pressable>
        ))}
    </ScrollView>
  );
};

export default LogistikAktif;
