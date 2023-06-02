import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, Text, View} from 'native-base';
import {Alert, Image, Pressable} from 'react-native';
import BottomSheetSukses from './BottomSheetSukses';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet, getLocation, heigth} from '../../../Helper';
import {useState} from 'react';
import LoadingModal from '../../../components/ModalLoading';
import {setLocation} from '../../../states/home/homeAction';

const SurveyAktif = ({data}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {location} = useSelector(state => state.homeReducer);

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
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {data?.length} Survey
      </Text>
      {data?.map((el, idx) => (
        <Pressable
          onPress={() => {
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
                      navigation.navigate('SurveyDetailScreen', {detail: el});
                    }
                  })
                  .catch(err => {
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
                  Alert.alert(
                    'Warning',
                    'Anda perlu mengaktifkan perizinan lokasi untuk melakukan survey',
                  );
                } else {
                  navigation.navigate('SurveyDetailScreen', {detail: el});
                }
                setLoading(false);
              }
            });
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
