import {Text, View} from 'native-base';
import OnTapTextInput from '../../components/OnTapTextInput';
import {useCallback, useState} from 'react';
import SelectPartai from './surveyKhususComponents/SelectPartai';
import {useDispatch, useSelector} from 'react-redux';
import {setSurveyKhusus} from '../../states/survey/surveyAction';
import SelectCaleg from './surveyKhususComponents/SelectCaleg';
import {useNavigation} from '@react-navigation/native';

const {SafeAreaView, Alert, Pressable} = require('react-native');
const {default: globalStyles} = require('../../GlobalStyles');

const SurveyKhususScreen = () => {
  const [showPartai, setShowPartai] = useState(false);
  const [showCaleg, setShowCaleg] = useState(false);
  const {surveyKhusus} = useSelector(state => state.surveyReducer);
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

  const naviigation = useNavigation();

  return (
    <SafeAreaView style={globalStyles.container}>
      <View flex={1} p={4}>
        <Text mb={8} fontSize={16} fontWeight={'semibold'}>
          Pilihan Caleg DPR RI
        </Text>
        <Text color={'rgba(185, 185, 185, 1)'}>
          Pilihan Partai Politik Anda
        </Text>
        <OnTapTextInput
          placeholder="Pilih Partai Politik"
          value={surveyKhusus.dprRi?.partai}
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
                dprRi: {
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
          value={surveyKhusus.dprRi?.caleg}
          onTap={() => {
            if (!surveyKhusus.dprRi?.partai) {
              Alert.alert('Peringatan', 'Partai Politik tidak boleh kosong');
            } else {
              handleShowCaleg(true);
            }
          }}
        />
        {showCaleg && (
          <SelectCaleg
            onClose={() => handleShowCaleg(false)}
            id_partai={surveyKhusus.dprRi?.partai.id}
            id_category={1}
            onSelect={value => {
              handleChaneSurvey({
                ...surveyKhusus,
                dprRi: {
                  partai: surveyKhusus.dprRi?.partai,
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
          naviigation.navigate('SurveyProvScreen');
        }}
        disabled={surveyKhusus.dprRi?.caleg === null ? true : false}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor:
              surveyKhusus.dprRi?.caleg === null
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

export default SurveyKhususScreen;
