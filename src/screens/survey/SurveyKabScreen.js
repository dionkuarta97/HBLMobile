import {Text, View} from 'native-base';
import OnTapTextInput from '../../components/OnTapTextInput';
import {useCallback, useState} from 'react';
import SelectPartai from './surveyKhususComponents/SelectPartai';
import {useDispatch, useSelector} from 'react-redux';
import {
  insertAnswerKhusus,
  setSurveyKhusus,
} from '../../states/survey/surveyAction';
import SelectCaleg from './surveyKhususComponents/SelectCaleg';
import {useNavigation} from '@react-navigation/native';
import LoadingModal from '../../components/ModalLoading';
import {getUser} from '../../states/auth/authAction';

const {SafeAreaView, Alert, Pressable} = require('react-native');
const {default: globalStyles} = require('../../GlobalStyles');

const SurveyKabScreen = () => {
  const [showPartai, setShowPartai] = useState(false);
  const [showCaleg, setShowCaleg] = useState(false);
  const [loading, setLoading] = useState(false);
  const {surveyKhusus} = useSelector(state => state.surveyReducer);
  const {user} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const handleChaneSurvey = useCallback(val => {
    dispatch(setSurveyKhusus(val));
  });

  const handleShowPartai = useCallback(val => {
    setShowPartai(val);
  });
  const handleShowCaleg = useCallback(val => {
    setShowCaleg(val);
  });

  const navigation = useNavigation();

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <LoadingModal />}
      <View flex={1} p={4}>
        <Text mb={8} fontSize={16} fontWeight={'semibold'}>
          Pilihan Caleg DPRD Tingkat 2
        </Text>
        <Text color={'rgba(185, 185, 185, 1)'}>
          Pilihan Partai Politik Anda
        </Text>
        <OnTapTextInput
          placeholder="Pilih Partai Politik"
          value={surveyKhusus.dprKab?.partai}
          onTap={() => {
            handleShowPartai(true);
          }}
        />
        {showPartai && (
          <SelectPartai
            onClose={() => handleShowPartai(false)}
            onSelect={value => {
              handleChaneSurvey({
                ...surveyKhusus,
                dprKab: {
                  partai: value,
                  caleg: null,
                },
              });
              handleShowPartai(false);
            }}
          />
        )}
        <Text color={'rgba(185, 185, 185, 1)'}>Pilihan Caleg Anda</Text>
        <OnTapTextInput
          placeholder="Pilih Caleg"
          value={surveyKhusus.dprKab?.caleg}
          onTap={() => {
            if (!surveyKhusus.dprKab?.partai) {
              Alert.alert('Peringatan', 'Partai Politik tidak boleh kosong');
            } else {
              handleShowCaleg(true);
            }
          }}
        />
        {showCaleg && (
          <SelectCaleg
            onClose={() => handleShowCaleg(false)}
            id_partai={surveyKhusus.dprKab?.partai.id}
            id_category={3}
            id_daerah={user.id_kecamatan}
            onSelect={value => {
              handleChaneSurvey({
                ...surveyKhusus,
                dprKab: {
                  partai: surveyKhusus.dprKab?.partai,
                  caleg: value,
                },
              });
              handleShowCaleg(false);
            }}
          />
        )}
      </View>
      <Pressable
        onPress={() => {
          setLoading(true);
          let temp = [];

          if (surveyKhusus.dprRi) {
            temp.push({
              id_category: 1,
              id_answer_caleg: surveyKhusus.dprRi.caleg.id,
              id_user: user.id,
            });
          }
          if (surveyKhusus.dprProv) {
            temp.push({
              id_category: 1,
              id_answer_caleg: surveyKhusus.dprProv.caleg.id,
              id_user: user.id,
            });
          }
          if (surveyKhusus.dprKab) {
            temp.push({
              id_category: 1,
              id_answer_caleg: surveyKhusus.dprKab.caleg.id,
              id_user: user.id,
            });
          }
          insertAnswerKhusus(temp)
            .then(() => {
              dispatch(getUser());
              Alert.alert('Berhasil', 'Survey anda telah dikirim', [
                {
                  text: 'OKE',
                  onPress: () => {
                    navigation.navigate('HomeScreen');
                  },
                },
              ]);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        disabled={!surveyKhusus.dprKab?.caleg ? true : false}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor: !surveyKhusus.dprKab?.caleg
              ? '#B1B1B1'
              : pressed
              ? 'rgba(0, 77, 153, 0.8)'
              : 'rgba(0, 77, 153, 1)',
          },
        ]}>
        <Text color={'white'}>Selanjutnya</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SurveyKabScreen;
