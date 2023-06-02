import {ScrollView, Text, View} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from '../../../components/ModalLoading';
import {useState} from 'react';
import {Pressable, Image, Alert} from 'react-native';
import {checkInternet, heigth} from '../../../Helper';
import {
  kirimPengaduan,
  setTempatSimpan,
} from '../../../states/pengaduan/pengaduanAction';

const PengaduanPending = () => {
  const {tempatSimpan} = useSelector(state => state.pengaduanReducer);
  const {user} = useSelector(state => state.authReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(JSON.stringify(tempatSimpan, null, 2));
  return (
    <ScrollView p={4}>
      {loading && <LoadingModal />}
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {
          tempatSimpan.filter(el => Number(el.id_pelapor) === Number(user.id))
            .length
        }{' '}
        Pengaduan
      </Text>
      {tempatSimpan
        .filter(el => Number(el.id_pelapor) === Number(user.id))
        .map((el, idx) => (
          <Pressable
            onPress={() => {
              Alert.alert('Informasi', 'Kirim ulang pengaduan kamu', [
                {
                  text: 'Tidak',
                },
                {
                  text: 'YA',
                  onPress: () => {
                    const data = new FormData();
                    data.append('id_pelapor', el.id_pelapor);
                    data.append('judul', el.judul);
                    data.append('keterangan', el.keterangan);
                    data.append('latitude', el.latitude);
                    data.append('longtitude', el.longtitude);
                    data.append('image', {
                      uri: el.image.uri,
                      type: el.image.type,
                      name: el.image.name,
                    });
                    // console.log(JSON.stringify(data, null, 2));
                    checkInternet().then(val => {
                      if (val) {
                        setLoading(true);

                        kirimPengaduan(data)
                          .then(() => {
                            let temp = tempatSimpan?.filter(
                              key => Number(key.id_pelapor) === Number(user.id),
                            );

                            dispatch(
                              setTempatSimpan(
                                temp.filter(
                                  key => key.id_local !== el.id_local,
                                ),
                              ),
                            );
                            Alert.alert(
                              'Berhasil',
                              'pengaduan berhasil dikirim',
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
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingVertical: 10,
                marginBottom:
                  idx + 1 ===
                  tempatSimpan.filter(
                    el => Number(el.id_pelapor) === Number(user.id),
                  ).length
                    ? heigth / 15
                    : 0,
                borderColor:
                  idx + 1 ===
                  tempatSimpan.filter(
                    el => Number(el.id_pelapor) === Number(user.id),
                  ).length
                    ? 'rgba(224, 224, 224, 0)'
                    : 'rgba(224, 224, 224, 1)',
              },
            ]}
            key={idx + 'asas'}>
            <View padding={2} borderRadius={50} bg={'rgba(233, 63, 52, 1)'}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                }}
                source={require('../../../../assets/icons/pengaduan.png')}
              />
            </View>
            <View width={'75%'} ml={4}>
              <Text numberOfLines={1} fontWeight={'semibold'}>
                {el.judul}
              </Text>
              <Text numberOfLines={1} color={'rgba(97, 97, 97, 1)'}>
                {el.keterangan}
              </Text>
            </View>
          </Pressable>
        ))}
    </ScrollView>
  );
};
export default PengaduanPending;
