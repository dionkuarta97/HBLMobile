import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../GlobalStyles';
import Searching from './canvasingComponents/Searching';
import {useCallback, useState} from 'react';
import {getDpt, kirimCanvasing} from '../../states/canvasing/canvasingActions';
import LoadingModal from '../../components/ModalLoading';
import {Alert, Pressable, TextInput, TouchableOpacity} from 'react-native';
import {Center, Radio, ScrollView, Text, View} from 'native-base';
import DefaultBottomSheet from '../../components/DefaultBottomSheet';
import {width} from '../../Helper';
import {useSelector} from 'react-redux';

const CanvasingScreen = () => {
  const [nik, setNIk] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(null);
  const [answer, setAnswer] = useState('');
  const [jawaban, setJawaban] = useState(0);
  const {location} = useSelector(state => state.homeReducer);

  const handleSetData = useCallback(
    val => {
      setData(val);
    },
    [data],
  );
  const handleSetLoading = useCallback(
    val => {
      setLoading(val);
    },
    [loading],
  );
  const handleSetNik = useCallback(
    val => {
      setNIk(val);
    },
    [nik],
  );

  const handlePress = async () => {
    try {
      handleSetData(null);
      handleSetLoading(true);
      const data = await getDpt(nik);
      handleSetData(data);
      handleSetLoading(false);
    } catch (error) {
      handleSetData(null);
      Alert.alert('opss', error.message);

      handleSetLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      <Searching
        onPress={() => {
          handlePress();
        }}
        value={nik}
        onChange={val => handleSetNik(val)}
      />
      {data && (
        <ScrollView p={4}>
          <View mb={4} mt={8}>
            <Center borderBottomWidth={1} pb={1}>
              <Text fontSize={17} fontWeight={'bold'}>
                Pertanyaan
              </Text>
            </Center>
          </View>
          <View>
            {data?.pertanyaan.map((el, idx) => (
              <TouchableOpacity
                onPress={() => {
                  setDetail(el);
                  setShow(true);
                }}
                style={{
                  borderRadius: 8,
                  marginBottom: data?.pertanyaan.length - 1 === idx ? 50 : 8,
                  borderWidth: 1,
                  padding: 4,
                }}
                key={el.id}>
                <Text>
                  {idx + 1}. {el.pertanyaan}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {show && (
        <DefaultBottomSheet
          onClose={() => {
            setShow(false);
            setDetail(null);
            setJawaban(0);
            setAnswer('');
          }}
          title={'Input Jawaban'}>
          <View>
            <Text fontWeight={'bold'} fontSize={16}>
              {detail.pertanyaan}
            </Text>
            <ScrollView>
              {detail.type === 1 && (
                <TextInput
                  onChangeText={val => {
                    setAnswer(val);
                  }}
                  multiline
                  value={answer}
                  numberOfLines={4}
                  placeholder="tulis jawaban"
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 15,
                    textAlignVertical: 'top',
                    width: '100%',
                    borderWidth: 0.8,
                    borderRadius: 5,
                    borderColor: 'rgba(214, 228, 236, 1)',
                    backgroundColor: 'rgba(251, 251, 251, 1)',
                  }}
                />
              )}
              {detail.type === 2 && (
                <Radio.Group
                  onChange={val => {
                    setJawaban(val);
                  }}
                  value={jawaban}
                  colorScheme={'blue'}>
                  {detail.question_detail.map((el, index) => (
                    <Radio
                      value={el.id}
                      mt={4}
                      mb={detail.question_detail?.length - 1 === index ? 50 : 0}
                      key={el.id}>
                      <Text
                        mb={
                          detail.question_detail?.length - 1 === index ? 50 : 0
                        }
                        mt={4}>
                        {el.jawaban}
                      </Text>
                    </Radio>
                  ))}
                </Radio.Group>
              )}
            </ScrollView>
          </View>
          <Pressable
            onPress={() => {
              setLoading(true);
              kirimCanvasing({
                nik: nik,
                id_question: detail.id,
                answer: answer,
                jawaban: jawaban,
                latitude: location.latitude,
                longtitude: location.longtitude,
              })
                .then(val => {
                  Alert.alert('berhasil', val, [
                    {
                      text: 'Ya',
                      onPress: () => {
                        setShow(false);
                        handlePress();
                        setJawaban(0);
                        setAnswer('');
                        setDetail(null);
                      },
                    },
                  ]);
                })
                .catch(err => {
                  setShow(false);
                  setJawaban(0);
                  setAnswer('');
                  setDetail(null);

                  Alert.alert('ops', err);
                })
                .finally(() => setLoading(false));
            }}
            style={({pressed}) => [
              {
                transform: [
                  {
                    scale: pressed ? 0.99 : 1,
                  },
                ],
                alignSelf: 'center',
                width: width / 1.1,
                alignItems: 'center',
                marginVertical: 15,
                backgroundColor: pressed
                  ? 'rgba(220, 53, 69, 0.8)'
                  : 'rgba(220, 53, 69, 1)',
                padding: 15,
                borderRadius: 8,
              },
            ]}>
            <Text
              style={{
                color: 'white',
              }}>
              Kirim Jawaban
            </Text>
          </Pressable>
        </DefaultBottomSheet>
      )}
    </SafeAreaView>
  );
};

export default CanvasingScreen;
