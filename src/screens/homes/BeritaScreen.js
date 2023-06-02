import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import {default as globalStyles} from '../../GlobalStyles';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getListBerita} from '../../states/home/homeAction';
import {View} from 'native-base';
import BeritaCard from './beritaComponents/BeritaCard';
import {checkInternet} from '../../Helper';

const BeritaScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const {listBerita} = useSelector(state => state.homeReducer);
  const handleInfinityScroll = useCallback(e => {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) {
      return true;
    }
    return false;
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkInternet().then(data => {
        if (data) {
          setLoading(true);
          dispatch(getListBerita(page, []))
            .then(() => {})
            .catch(err => {})
            .finally(() => {
              setLoading(false);
            });
        }
      });
    }, []),
  );

  const handlePage = useCallback(val => {
    setPage(val);
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        style={{padding: 10}}
        onScroll={e => {
          if (handleInfinityScroll(e)) {
            if (listBerita?.total_data > listBerita?.berita.length) {
              checkInternet().then(data => {
                if (data) {
                  setLoading(true);
                  dispatch(getListBerita(page + 1, listBerita?.berita))
                    .then(() => {})
                    .catch(err => {})
                    .finally(() => {
                      setLoading(false);
                    });
                  handlePage(page + 1);
                }
              });
            }
          }
        }}>
        {listBerita?.berita.map((el, idx) => (
          <BeritaCard navigation={navigation} key={idx} data={el} />
        ))}
        {loading && (
          <View padding={5}>
            <ActivityIndicator color={'rgba(0, 77, 153, 1)'} size={30} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeritaScreen;
