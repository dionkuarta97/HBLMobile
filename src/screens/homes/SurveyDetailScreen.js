import {Pressable, SafeAreaView, TextInput} from 'react-native';
import {default as globalStyles} from '../../GlobalStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Radio, Text, View} from 'native-base';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  kirimSurvey,
  setAnswerSurvey,
  setSurveyBody,
  setSurveyOffline,
} from '../../states/survey/surveyAction';
import LoadingModal from '../../components/ModalLoading';
import {checkInternet} from '../../Helper';

const SurveyDetailScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [idx, setIndex] = useState(0);
  const {detail} = route.params;
  const [answer, setAnswer] = useState(null);
  const {answerSurvey, surveyOffline, surveyBody} = useSelector(
    state => state.surveyReducer,
  );
  const {location} = useSelector(state => state.homeReducer);
  const {user} = useSelector(state => state.authReducer);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    let temp = [];

    for (const key in detail?.question) {
      temp.push({
        id_survey: detail.question[key].id_survey,
        id_question: detail.question[key].id,
        answer: '',
        jawaban: 0,
      });
    }

    dispatch(setAnswerSurvey(temp));
    setLoading(false);
    return () => {
      dispatch(setAnswerSurvey(null));
    };
  }, []);

  const handleChangeAnswer = useCallback(val => {
    let temp = answerSurvey;
    if (typeof val === 'string') {
      temp[idx]['answer'] = val;
    } else {
      temp[idx]['jawaban'] = val;
    }

    dispatch(setAnswerSurvey(temp));
    setAnswer(val);
  });
  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      <View flex={1}>
        <View p={4} flexDirection={'row'}>
          <View
            width={'20%'}
            alignItems={'center'}
            borderRadius={5}
            bg={'rgba(0, 77, 153, 1)'}
            paddingY={4}>
            <Text fontWeight={'semibold'} color={'white'}>
              {idx + 1 + '/' + detail.question.length}
            </Text>
          </View>
          <View ml={4} width={'70%'}>
            <Text fontWeight={'bold'} numberOfLines={2} fontSize={17}>
              {detail.judul}
            </Text>
          </View>
        </View>
        <View p={4}>
          <View width={'100%'}>
            <Text fontWeight={'semibold'} fontSize={15}>
              {detail.question[idx].pertanyaan}
            </Text>
          </View>
          <Text color={'rgba(185, 185, 185, 1)'} mt={4} mb={2}>
            Jawaban
          </Text>
          {Number(detail.question[idx].type) === 1
            ? answerSurvey && (
                <TextInput
                  onChangeText={val => {
                    handleChangeAnswer(val);
                  }}
                  value={answerSurvey[idx]?.answer}
                  multiline
                  numberOfLines={4}
                  placeholder="tulis jawaban"
                  style={{
                    paddingHorizontal: 15,
                    textAlignVertical: 'top',
                    width: '100%',
                    borderWidth: 0.8,
                    borderRadius: 5,
                    borderColor: 'rgba(214, 228, 236, 1)',
                    backgroundColor: 'rgba(251, 251, 251, 1)',
                  }}
                />
              )
            : answerSurvey && (
                <Radio.Group
                  onChange={val => {
                    handleChangeAnswer(val);
                  }}
                  value={answerSurvey[idx]?.jawaban}
                  colorScheme={'blue'}>
                  {detail.question[idx].question_detail.map(el => (
                    <Radio value={el.id} mt={4} key={el.id}>
                      <Text mt={4}>{el.jawaban}</Text>
                    </Radio>
                  ))}
                </Radio.Group>
              )}
        </View>
      </View>

      <Pressable
        onPress={() => {
          if (idx + 1 < detail.question.length) {
            setIndex(idx + 1);
            setAnswer(null);
          } else {
            setLoading(true);
            checkInternet().then(val => {
              if (val) {
                kirimSurvey({
                  answer: answerSurvey,
                  id_pengisi: user.id,
                  id_survey: detail.id,
                  latitude: location.latitude,
                  longtitude: location.longtitude,
                })
                  .then(data => {
                    navigation.navigate('SurveyScreen', {onOpen: true});
                  })
                  .catch(err => {
                    console.log(err);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              } else {
                dispatch(
                  setSurveyOffline([
                    ...surveyOffline,
                    {
                      id_local: surveyOffline.length + 1,
                      answer: answerSurvey,
                      id_pengisi: user.id,
                      id_survey: detail.id,
                      latitude: location.latitude,
                      longtitude: location.longtitude,
                      judul: detail.judul,
                    },
                  ]),
                );
                navigation.navigate('SurveyScreen', {onOpen: true});
                setLoading(false);
              }
            });
          }
        }}
        disabled={!answer ? true : false}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor: !answer
              ? '#B1B1B1'
              : pressed
              ? 'rgba(0, 77, 153, 0.8)'
              : 'rgba(0, 77, 153, 1)',
          },
        ]}>
        <Text color={'white'}>
          {idx + 1 < detail.question.length ? 'Selanjutnya' : 'Selesai'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SurveyDetailScreen;
