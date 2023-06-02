import {ScrollView, View, Text} from 'native-base';
import {Pressable, Image, Alert} from 'react-native';
import {checkInternet, heigth} from '../../../Helper';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import LoadingModal from '../../../components/ModalLoading';
import {
  kirimSurvey,
  setSurveyOffline,
} from '../../../states/survey/surveyAction';

const SurveyPending = ({data, id_user}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(JSON.stringify(data, null, 2));
  return (
    <ScrollView p={4}>
      {loading && <LoadingModal />}
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {data?.filter(val => Number(val.id_pengisi) === Number(id_user)).length}{' '}
        Survey
      </Text>
      {data
        ?.filter(val => Number(val.id_pengisi) === Number(id_user))
        .map((el, idx) => (
          <Pressable
            onPress={() => {
              Alert.alert('Informasi', 'Kirim ulang survey kamu', [
                {
                  text: 'Tidak',
                },
                {
                  text: 'YA',
                  onPress: () => {
                    checkInternet().then(val => {
                      if (val) {
                        setLoading(true);
                        kirimSurvey(el)
                          .then(() => {
                            dispatch(
                              setSurveyOffline(
                                data?.filter(
                                  key => key.id_local !== el.id_local,
                                ),
                              ),
                            );
                            Alert.alert('Berhasil', 'Survey berhasil dikirim');
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
                  data?.filter(
                    val => Number(val.id_pengisi) === Number(id_user),
                  ).length
                    ? heigth / 15
                    : 0,
                borderColor:
                  idx + 1 ===
                  data?.filter(
                    val => Number(val.id_pengisi) === Number(id_user),
                  ).length
                    ? 'rgba(224, 224, 224, 0)'
                    : 'rgba(224, 224, 224, 1)',
              },
            ]}
            key={idx}>
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

export default SurveyPending;
