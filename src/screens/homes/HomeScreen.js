import {View, Text, Button} from 'native-base';
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
import HomeCarousel from './homeComponents/HomeCarousel';
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.authReducer);
  const {dashboardData} = useSelector(state => state.homeReducer);
  const {surveyOffline, surveyBody} = useSelector(state => state.surveyReducer);
  const {tugasOffline} = useSelector(state => state.tugasReducer);
  const {logistikOffline} = useSelector(state => state.logistikReducer);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      checkInternet().then(data => {
        if (data) {
          setLoading(true);
          dispatch(getDashboardData()).finally(() => {
            setLoading(false);
          });
          setLoading(true);
          dispatch(getDashboardBerita()).finally(() => {
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
        backgroundColor: 'rgba(200, 228, 255, 0.4)',
      }}>
      <ScrollView style={{flex: 1}}>
        {loading && <LoadingModal />}
        <View
          shadow={3}
          paddingTop={10}
          paddingBottom={user?.role !== 1 ? 0 : 6}
          bg={'white'}>
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
                <Text fontWeight={'semibold'} color={'rgba(0, 77, 153, 1)'}>
                  Halo,{' '}
                  <Text fontWeight={'normal'}>
                    {user?.jk === 'Laki - laki' ? 'Bapak' : 'ibu'}
                  </Text>
                </Text>
                <Text numberOfLines={1} color={'rgba(0, 77, 153, 1)'}>
                  {user?.nama}
                </Text>
              </View>
              <Image
                source={require('../../../assets/person.png')}
                style={{
                  width: width / 8,
                  resizeMode: 'contain',
                  height: heigth / 24,
                }}
              />
            </View>
          </View>
          <View
            borderTopWidth={0.8}
            mt={4}
            borderColor={'rgba(0, 77, 153, 1)'}
            alignSelf={'center'}
            width={width / 1.2}
          />
          {user?.role !== '1' && <JumlahPemilh />}
        </View>
        <View padding={4} flex={1}>
          <View
            bg={'white'}
            paddingY={5}
            borderRadius={8}
            shadow={1}
            marginTop={4}>
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
                bg={'rgba(0, 77, 153, 1)'}
                width={width / 1.4}
                justifyContent={'center'}
                alignSelf={'center'}
                borderRadius={5}
                alignItems={'center'}
                paddingY={3}>
                <Text color={'white'}>Survey Khusus</Text>
              </Button>
            )}
          </View>
        </View>
        <HomeCarousel />
        <View padding={4} bg={'white'} flex={1}>
          <View mb={4} alignItems={'center'} flexDirection={'row'}>
            <Text fontWeight={'semibold'} fontSize={16}>
              Berita dari Hillary
            </Text>
            <Pressable
              onPress={() => navigation.navigate('BeritaScreen')}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.7 : 1,
                  marginLeft: 'auto',
                  borderBottomWidth: 1,
                  borderColor: pressed
                    ? 'rgba(0, 77, 153, 1)'
                    : 'rgba(0, 77, 153, 0)',
                },
              ]}>
              <Text color={'rgba(0, 77, 153, 1)'}>lihat semua berita</Text>
            </Pressable>
          </View>
          <DashboardBerita />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
