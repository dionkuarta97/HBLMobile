import {View, Text, ScrollView} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getListTugasSelesai} from '../../../states/tugas/tugasAction';
import {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Image} from 'react-native';
import {checkInternet, heigth} from '../../../Helper';

const TugasSelesai = () => {
  const {listTugasSelesai} = useSelector(state => state.tugasReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      checkInternet().then(val => {
        if (val) {
          dispatch(getListTugasSelesai());
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
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {listTugasSelesai?.length} tugas
      </Text>
      {listTugasSelesai?.map((el, idx) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 10,

            marginBottom:
              idx + 1 === listTugasSelesai?.length ? heigth / 15 : 0,
            borderColor:
              idx + 1 === listTugasSelesai?.length
                ? 'rgba(224, 224, 224, 0)'
                : 'rgba(224, 224, 224, 1)',
          }}
          key={idx + 'asas'}>
          <View padding={2} borderRadius={50} bg={'rgba(91, 95, 199, 1)'}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
              source={require('../../../../assets/icons/tugas.png')}
            />
          </View>
          <View width={'75%'} ml={4}>
            <Text numberOfLines={1} fontWeight={'semibold'}>
              {el.judul}
            </Text>
            <Text numberOfLines={1} color={'rgba(97, 97, 97, 1)'}>
              tanggal pelaksanaan: {dateToString(el.tanggal_pelaksanaan)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default TugasSelesai;
