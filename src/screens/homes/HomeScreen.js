import {View, Text, Button, Center} from 'native-base';
import {
  Image,
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {checkInternet, getLocation, heigth, width} from '../../Helper';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  getDashboardBerita,
  getDashboardData,
  setLocation,
} from '../../states/home/homeAction';
import DashboardBerita from './homeComponents/DashboardBerita';
import MenuPemilih from './homeComponents/MenuPemilih';
import LoadingModal from '../../components/ModalLoading';
import {
  kirimBanyakSurvey,
  setSurveyBody,
  setSurveyKhusus,
  setSurveyOffline,
} from '../../states/survey/surveyAction';
import {
  kirimBanyakPengaduan,
  setTempatSimpan,
} from '../../states/pengaduan/pengaduanAction';
import MenuRelawan from './homeComponents/menuRelawan';
import JumlahPemilh from './homeComponents/JumlahPemilh';
import DefaultModal from '../../components/DefaultModal';
import {lastLogin} from '../../states/auth/authAction';
import {useQuery} from 'react-query';
import {getPenugasanQuickCount} from '../../states/reactQuery';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.authReducer);
  const {dashboardData} = useSelector(state => state.homeReducer);
  const {surveyOffline, surveyBody} = useSelector(state => state.surveyReducer);
  const {tugasOffline} = useSelector(state => state.tugasReducer);
  const {logistikOffline} = useSelector(state => state.logistikReducer);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const {data, refetch} = useQuery(
    ['penugasan_quick_count'],
    async () => await getPenugasanQuickCount(user.id),
    {
      staleTime: 60000,
    },
  );
  useFocusEffect(
    useCallback(() => {
      checkInternet().then(data => {
        refetch({forece: true});
        if (data) {
          setLoading(true);
          Promise.all([
            dispatch(getDashboardData()),
            dispatch(getDashboardBerita()),
            getLocation(),
            dispatch(lastLogin()),
          ])
            .then(val => {
              dispatch(
                setLocation({
                  latitude: val[2].coords.latitude,
                  longtitude: val[2].coords.longitude,
                }),
              );
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });
    }, [isFocused]),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}>
      {showModal && (
        <DefaultModal>
          <Center py={20}>
            <Text fontWeight={'bold'}>
              Terjadi kesalahan pada server atau anda tidak mengaktifkan izin
              lokasi
            </Text>
          </Center>
        </DefaultModal>
      )}
      <ScrollView style={{flex: 1}}>
        {loading && <LoadingModal />}
        <View
          shadow={3}
          paddingTop={10}
          paddingBottom={user?.role === '1' ? 6 : 0}
          bg={'rgba(216, 32, 40, 1)'}>
          <View flexDirection={'row'}>
            <View width={'50%'} alignItems={'center'}>
              <Image
                source={require('../../../assets/logo.png')}
                style={{
                  width: width / 4,
                  resizeMode: 'contain',
                  height: heigth / 16,
                }}
              />
            </View>
            <View
              width={'50%'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}>
              <View alignItems={'flex-end'}>
                <Text numberOfLines={1} fontWeight={'semibold'} color={'white'}>
                  Halo,{' '}
                  <Text fontWeight={'normal'}>
                    {user?.jk === 'Laki - laki' ? 'Bapak' : 'ibu'} {user?.nama}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {user?.role !== '1' && <JumlahPemilh />}
        </View>
        <View padding={4} flex={1}>
          <View paddingY={5} marginTop={4}>
            {user?.role === '1' && (
              <MenuPemilih
                navigation={navigation}
                survey={
                  dashboardData?.survey -
                  surveyOffline.filter(el => el.id_pengisi === user.id).length
                }
                pengaduan={dashboardData?.pengaduan}
              />
            )}
            {user?.role === '2' && (
              <MenuRelawan
                navigation={navigation}
                survey={dashboardData?.survey}
                pengaduan={dashboardData?.pengaduan}
                tugas={
                  dashboardData?.tugas -
                  tugasOffline?.filter(
                    key => Number(key.pic) === Number(user.id),
                  ).length
                }
                logistik={
                  dashboardData?.logistik -
                  logistikOffline?.filter(
                    key => Number(key.pic) === Number(user.id),
                  ).length
                }
              />
            )}
            {user?.referrer_to !== '' && Number(user?.attemp_survey) === 1 && (
              <Button
                onPress={async () => {
                  dispatch(
                    setSurveyKhusus({
                      dprRi: {
                        caleg: null,
                        partai: null,
                      },
                      dprProv: {
                        caleg: null,
                        partai: null,
                      },
                      dprKab: {
                        caleg: null,
                        partai: null,
                      },
                    }),
                  );
                  navigation.navigate('SurveyKhususScreen');
                }}
                mt={8}
                _pressed={{
                  bg: 'rgba(220, 53, 69, 0.8)',
                }}
                bg={'rgba(220, 53, 69, 1)'}
                width={width / 1.4}
                justifyContent={'center'}
                alignSelf={'center'}
                borderRadius={5}
                alignItems={'center'}
                paddingY={3}>
                <Text color={'white'}>Survey Khusus</Text>
              </Button>
            )}

            {data?.penugasan && data?.penugasan?.tps_detail?.path === '[]' && (
              <Button
                onPress={async () => {
                  navigation.navigate('QuickCountScreen', {
                    tpsId: data?.penugasan.id_tps,
                  });
                }}
                mt={1}
                colorScheme={'darkBlue'}
                width={width / 1.4}
                justifyContent={'center'}
                alignSelf={'center'}
                borderRadius={5}
                alignItems={'center'}
                paddingY={3}>
                <Text color={'white'}>Quick Count</Text>
              </Button>
            )}
          </View>
        </View>

        <View padding={4} bg={'white'} flex={1}>
          <View mb={4}>
            <Text fontWeight={'semibold'} fontSize={16}>
              Berita dari Franko
            </Text>
          </View>
          <DashboardBerita />
          <Pressable
            onPress={() => navigation.navigate('BeritaScreen')}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.7 : 1,
                alignSelf: 'center',
                borderBottomWidth: 1,
                borderColor: pressed
                  ? 'rgba(220, 53, 69, 1)'
                  : 'rgba(220, 53, 69, 0)',
              },
            ]}>
            <Text color={'rgba(216, 32, 40, 1)'}>lihat semua berita</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
