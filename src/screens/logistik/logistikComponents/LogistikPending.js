import {ScrollView, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet, heigth} from '../../../Helper';
import {Alert, Image, Pressable} from 'react-native';
import {useCallback, useState} from 'react';
import LoadingModal from '../../../components/ModalLoading';
import {
  kirimLogistik,
  setLogistikOffline,
} from '../../../states/logistik/logistikAction';

const LogistikPending = () => {
  const {logistikOffline} = useSelector(state => state.logistikReducer);
  const {user} = useSelector(state => state.authReducer);
  const [loading, setLoading] = useState(false);
  const dateToString = useCallback(date => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });
  const dispatch = useDispatch();
  console.log(JSON.stringify(logistikOffline, null, 2));
  return (
    <ScrollView p={4}>
      {loading && <LoadingModal />}
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {
          logistikOffline?.filter(el => Number(el.pic) === Number(user.id))
            .length
        }{' '}
        tugas
      </Text>
      {logistikOffline
        ?.filter(el => Number(el.pic) === Number(user.id))
        .map((el, idx) => (
          <Pressable
            onPress={() => {
              Alert.alert('Informasi', 'Kirim ulang laporan logistik kamu', [
                {
                  text: 'Tidak',
                },
                {
                  text: 'YA',
                  onPress: () => {
                    const data = new FormData();
                    data.append('id', el.id);
                    data.append('laporan', el.laporan);
                    data.append('image', {
                      uri: el.image.uri,
                      type: el.image.type,
                      name: el.image.name,
                    });
                    checkInternet().then(val => {
                      if (val) {
                        setLoading(true);

                        kirimLogistik(data)
                          .then(() => {
                            let temp = logistikOffline?.filter(
                              key => Number(key.pic) === Number(user.id),
                            );

                            dispatch(
                              setLogistikOffline(
                                temp.filter(
                                  key => key.id_local !== el.id_local,
                                ),
                              ),
                            );
                            Alert.alert(
                              'Berhasil',
                              'laporan logistik berhasil dikirim',
                            );
                          })
                          .catch(er => {
                            console.log(er);
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      } else {
                        Alert.alert('Warning', 'Jaringan kamu masih belum ada');
                      }
                    });
                  },
                },
              ]);
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
                  logistikOffline?.filter(
                    el => Number(el.pic) === Number(user.id),
                  ).length
                    ? heigth / 15
                    : 0,
                borderColor:
                  idx + 1 ===
                  logistikOffline?.filter(
                    el => Number(el.pic) === Number(user.id),
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

export default LogistikPending;
