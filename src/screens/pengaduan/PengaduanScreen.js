import {Alert, Image, Pressable, SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import DefaultTabBar from '../../components/DefaultTabBar';
import PengaduanAktif from './pengaduanComponents/PengaduanAktif';
import PengaduanSelesai from './pengaduanComponents/PengaduanSelesai';

import {launchCamera} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import LoadingModal from '../../components/ModalLoading';
import {checkInternet, getLocation} from '../../Helper';
import {useDispatch, useSelector} from 'react-redux';
import {setLocation} from '../../states/home/homeAction';
import PengaduanPending from './pengaduanComponents/PengaduanPending';

const PengaduanScreen = () => {
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.homeReducer);
  const navigation = useNavigation();
  const route = useRoute();
  const handleTab = useCallback(val => {
    setTab(val);
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      {tab === 0 && (
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
                      const result = await launchCamera();
                      if (result.assets) {
                        navigation.navigate('InputPengaduanScreen', {
                          image: result.assets,
                        });
                      }
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
                if (!location) {
                  Alert.alert(
                    'Warning',
                    'Anda perlu mengaktifkan perizinan lokasi',
                  );
                } else {
                  const result = await launchCamera();
                  if (result.assets) {
                    navigation.navigate('InputPengaduanScreen', {
                      image: result.assets,
                    });
                  }
                }
                setLoading(false);
              }
            });
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed
                ? 'rgba(0, 77, 153, 0.7)'
                : 'rgba(0, 77, 153, 1)',
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
              position: 'absolute',
              bottom: 10,
              right: 20,
              zIndex: 10,
              padding: 15,
              borderRadius: 50,
              elevation: 2,
            },
          ]}>
          <Image
            source={require('../../../assets/icons/plus.png')}
            style={{
              resizeMode: 'contain',
              width: 20,
              height: 20,
            }}
          />
        </Pressable>
      )}
      <DefaultTabBar
        onIndexChange={val => {
          handleTab(val);
        }}
        routes={[
          {key: 'item1', title: 'Dilaporkan'},
          {
            key: 'item2',
            title: `Pending`,
          },
          {
            key: 'item3',
            title: `Selesai`,
          },
        ]}
        screen={[
          <PengaduanAktif data={[]} />,
          <PengaduanPending />,
          <PengaduanSelesai data={[]} />,
        ]}
      />
    </SafeAreaView>
  );
};

export default PengaduanScreen;
