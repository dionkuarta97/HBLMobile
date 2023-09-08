import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, Text, View} from 'native-base';
import {Alert, Image, Pressable} from 'react-native';
import BottomSheetSukses from './BottomSheetSukses';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet, getLocation, heigth} from '../../../Helper';
import {useState} from 'react';
import LoadingModal from '../../../components/ModalLoading';
import {setLocation} from '../../../states/home/homeAction';
import BottomSheetPenugasan from './BottomSheetPenugasan';

const SurveyAktif = ({data}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {location} = useSelector(state => state.homeReducer);
  const {user} = useSelector(state => state.authReducer);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  return (
    <ScrollView p={4}>
      {route.params?.onOpen && (
        <BottomSheetSukses
          isOpen={route.params?.onOpen}
          onClose={() => {
            navigation.setParams({onOpen: false});
          }}
        />
      )}
      {loading && <LoadingModal />}
      <BottomSheetPenugasan
        userId={user.id}
        onPress={id => {
          setShow(false);
          setLoading(true);
          checkInternet().then(val => {
            if (val) {
              getLocation()
                .then(data => {
                  if (data) {
                    dispatch(
                      setLocation({
                        latitude: data.coords.latitude,
                        longtitude: data.coords.longitude,
                      }),
                    );
                    navigation.navigate('SurveyDetailScreen', {
                      detail: detail,
                      id_daerah: id,
                    });
                  }
                })
                .catch(err => {
                  console.log(err, 'err');
                  Alert.alert(
                    'Warning',
                    'Anda perlu mengaktifkan perizinan lokasi untuk melakukan survey',
                  );
                })
                .finally(() => {
                  setLoading(false);
                });
            } else {
              if (!location) {
                console.log(location);
                Alert.alert(
                  'Warning',
                  'Anda perlu mengaktifkan perizinan lokasi untuk melakukan survey',
                );
              } else {
                navigation.navigate('SurveyDetailScreen', {
                  detail: detail,
                  id_daerah: id,
                });
              }
              setLoading(false);
            }
          });
        }}
        isOpen={show}
        onClose={() => setShow(false)}
      />
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {data?.length} Survey
      </Text>
      {data?.map((el, idx) => (
        <Pressable
          onPress={() => {
            if (user.role === '2') {
              setDetail(el);
              setShow(true);
            } else {
              setLoading(true);
              checkInternet().then(val => {
                if (val) {
                  getLocation()
                    .then(data => {
                      if (data) {
                        dispatch(
                          setLocation({
                            latitude: data.coords.latitude,
                            longtitude: data.coords.longitude,
                          }),
                        );
                        navigation.navigate('SurveyDetailScreen', {
                          detail: el,
                          id_daerah: user.id_kelurahan,
                        });
                      }
                    })
                    .catch(err => {
                      console.log(err, 'err');
                      Alert.alert(
                        'Warning',
                        'Anda perlu mengaktifkan perizinan lokasi untuk melakukan survey',
                      );
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                } else {
                  if (!location) {
                    console.log(location);
                    Alert.alert(
                      'Warning',
                      'Anda perlu mengaktifkan perizinan lokasi untuk melakukan survey',
                    );
                  } else {
                    navigation.navigate('SurveyDetailScreen', {
                      detail: el,
                      id_daerah: user.id_kelurahan,
                    });
                  }
                  setLoading(false);
                }
              });
            }
          }}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              paddingVertical: 10,
              marginBottom: idx + 1 === data?.length ? heigth / 15 : 0,
              borderColor:
                idx + 1 === data?.length
                  ? 'rgba(224, 224, 224, 0)'
                  : 'rgba(224, 224, 224, 1)',
            },
          ]}
          key={el.id}>
          <View padding={2} borderRadius={50} bg={'rgba(255, 124, 51, 1)'}>
            <Image
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
              source={require('../../../../assets/icons/survey.png')}
            />
          </View>
          <View width={'75%'} ml={4}>
            <Text numberOfLines={2} fontWeight={'semibold'}>
              {el.judul}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default SurveyAktif;
