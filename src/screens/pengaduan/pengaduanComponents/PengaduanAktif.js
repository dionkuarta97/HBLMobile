import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ScrollView, Text, View} from 'native-base';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet, heigth} from '../../../Helper';
import {useCallback, useState} from 'react';
import LoadingModal from '../../../components/ModalLoading';
import BottomSukses from './BottomSukses';
import {getListPengaduan} from '../../../states/pengaduan/pengaduanAction';

const PengaduanAktif = ({data}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = useSelector(state => state.authReducer);
  const {listPengaduan, tempatSimpan} = useSelector(
    state => state.pengaduanReducer,
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      checkInternet().then(val => {
        if (val) {
          dispatch(getListPengaduan())
            .then(() => {})
            .catch(() => {
              console.log('err');
            });
        }
      });
    }, []),
  );

  return (
    <ScrollView p={4}>
      {route.params?.onOpenPengaduan && (
        <BottomSukses
          isOpen={route.params?.onOpenPengaduan}
          onClose={() => {
            navigation.setParams({onOpenPengaduan: false, tabActive: false});
          }}
        />
      )}
      {loading && <LoadingModal />}
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {listPengaduan ? listPengaduan.length : 0} Pengaduan
      </Text>
      {listPengaduan &&
        listPengaduan.map((el, idx) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              paddingVertical: 10,
              marginBottom: idx + 1 === listPengaduan.length ? heigth / 15 : 0,
              borderColor:
                idx + 1 === listPengaduan.length
                  ? 'rgba(224, 224, 224, 0)'
                  : 'rgba(224, 224, 224, 1)',
            }}
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
          </View>
        ))}
    </ScrollView>
  );
};

export default PengaduanAktif;
