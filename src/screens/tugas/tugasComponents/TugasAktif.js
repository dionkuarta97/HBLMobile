import {View, Text, ScrollView} from 'native-base';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListTugas, setTugasOffline} from '../../../states/tugas/tugasAction';

import {Pressable, Image} from 'react-native';
import {checkInternet, heigth} from '../../../Helper';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import BottomTugas from './BottomTugas';

const TugasAktif = () => {
  const {listTugas, tugasOffline} = useSelector(state => state.tugasReducer);
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      checkInternet().then(val => {
        if (val) {
          dispatch(getListTugas());
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

  console.log(tugasOffline);
  return (
    <ScrollView p={4}>
      {route.params?.onOpenTugas && (
        <BottomTugas
          isOpen={route.params?.onOpenTugas}
          onClose={() => {
            navigation.setParams({onOpenTugas: false});
          }}
        />
      )}
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {
          listTugas?.filter(
            el => !tugasOffline.find(({id}) => el.id === id) && el,
          ).length
        }{' '}
        tugas
      </Text>
      {listTugas
        ?.filter(el => !tugasOffline.find(({id}) => el.id === id) && el)
        .map((el, idx) => (
          <Pressable
            onPress={() =>
              navigation.navigate('KirimTugasScreen', {detail: el})
            }
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingVertical: 10,
                opacity: pressed ? 0.5 : 1,
                marginBottom:
                  idx + 1 ===
                  listTugas?.filter(
                    el => !tugasOffline.find(({id}) => el.id === id) && el,
                  ).length
                    ? heigth / 15
                    : 0,
                borderColor:
                  idx + 1 ===
                  listTugas?.filter(
                    el => !tugasOffline.find(({id}) => el.id === id) && el,
                  ).length
                    ? 'rgba(224, 224, 224, 0)'
                    : 'rgba(224, 224, 224, 1)',
              },
            ]}
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
          </Pressable>
        ))}
    </ScrollView>
  );
};

export default TugasAktif;
