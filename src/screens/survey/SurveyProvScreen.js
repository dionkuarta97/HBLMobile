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

const SurveyProvScreen = () => {
  const [showPartai, setShowPartai] = useState(false);
  const [showCaleg, setShowCaleg] = useState(false);
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

  const navgation = useNavigation();

  return (
    <SafeAreaView style={globalStyles.container}>
      <View flex={1} p={4}>
        <Text mb={8} fontSize={16} fontWeight={'semibold'}>
          Pilihan Caleg DPRD Tingkat 1
        </Text>
        <Text color={'rgba(185, 185, 185, 1)'}>
          Pilihan Partai Politik Anda
        </Text>
        <OnTapTextInput
          placeholder="Pilih Partai Politik"
          value={surveyKhusus.dprProv?.partai}
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
                dprProv: {
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
          value={surveyKhusus.dprProv?.caleg}
          onTap={() => {
            if (!surveyKhusus.dprProv?.partai) {
              Alert.alert('Peringatan', 'Partai Politik tidak boleh kosong');
            } else {
              handleShowCaleg(true);
            }
          }}
        />
        {showCaleg && (
          <SelectCaleg
            onClose={() => handleShowCaleg(false)}
            id_partai={surveyKhusus.dprProv?.partai.id}
            id_category={2}
            id_daerah={user.id_kabupaten_kota}
            onSelect={value => {
              handleChaneSurvey({
                ...surveyKhusus,
                dprProv: {
                  partai: surveyKhusus.dprProv?.partai,
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
          navgation.navigate('SurveyKabScreen');
        }}
        disabled={surveyKhusus.dprProv?.caleg === null ? true : false}
        style={({pressed}) => [
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 5,
            width: '95%',
            backgroundColor:
              surveyKhusus.dprProv?.caleg === null
                ? '#B1B1B1'
                : pressed
                ? 'rgba(220, 53, 69, 0.8)'
                : 'rgba(220, 53, 69, 1)',
          },
        ]}>
        <Text color={'white'}>Selanjutnya</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SurveyProvScreen;
