import {SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  HStack,
  Heading,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {heigth, width} from '../../Helper';
import {getCaleg} from '../../states/reactQuery';
import LoadingModal from '../../components/ModalLoading';
import ListCaleg from './quickcountComponents/ListCaleg';
import {useDispatch, useSelector} from 'react-redux';
import {setQuickCountAnswer} from '../../states/home/homeAction';
import localStorage from 'redux-persist/es/storage';
const FomulirScreen = () => {
  const [category, setCategory] = useState(1);
  const {quickCountAnswer} = useSelector(state => state.homeReducer);
  const navigation = useNavigation();
  const [answer, setAnswer] = useState([]);
  const route = useRoute();
  const {tpsId} = route.params;
  const dispatch = useDispatch();
  const {data, isLoading, refetch} = useQuery(['caleg', category], async () => {
    const result = await getCaleg(category);
    const newData = result.partai.filter(fl => fl.caleg.length > 0);
    let temp = quickCountAnswer;
    let mantap = [];
    for (const val in newData) {
      let caleg = newData[val].caleg;
      let tes = {id: newData[val].id, nama: newData[val].nama, caleg: []};
      tes.caleg.push({
        nama_partai: newData[val].nama,
        nama_caleg: '',
        id_tps: tpsId,
        id_partai: newData[val].id,
        id_caleg: 0,
        jumlah:
          temp[category - 1].answer.length > 0
            ? temp[category - 1].answer[val].caleg[0].jumlah
            : '',
      });
      for (const cal in caleg) {
        tes.caleg.push({
          nama_partai: newData[val].nama,
          nama_caleg: caleg[cal].nama,
          id_tps: tpsId,
          id_partai: newData[val].id,
          id_caleg: caleg[cal].id,
          jumlah:
            temp[category - 1].answer.length > 0
              ? temp[category - 1].answer[val].caleg[Number(cal) + 1].jumlah
              : '',
        });
      }
      mantap.push(tes);
    }
    temp[category - 1] = {tingkat: category, answer: mantap};
    dispatch(setQuickCountAnswer(temp));
    return newData;
  });

  const handleChange = useCallback((text, indexPartai, indexCaleg) => {
    let temp = quickCountAnswer;
    temp[category - 1].answer[indexPartai].caleg[indexCaleg].jumlah = text;
    dispatch(setQuickCountAnswer(temp));
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      {isLoading && <LoadingModal />}
      <Center>
        <Box width={width / 1.2} mb={4}>
          <Select
            selectedValue={category}
            minWidth="200"
            _selectedItem={{
              bg: 'red.400',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setCategory(itemValue)}>
            <Select.Item label="DPR RI" value={1} />
            <Select.Item label="DPRD Tingkat 1" value={2} />
            <Select.Item label="DPRD TIngkat 2" value={3} />
          </Select>
        </Box>
      </Center>
      <ScrollView flex={1} px={4} pb={4}>
        {data?.map((el, idx) => {
          return (
            <ListCaleg
              el={el}
              key={idx + 'asdafas'}
              idn={idx}
              handleChange={handleChange}
              dat={
                quickCountAnswer.filter(x => x.tingkat === category)[0].answer[
                  idx
                ]
              }
              category={category}
            />
          );
        })}
        <Button
          my={50}
          onPress={() => navigation.navigate('UploadFotoScreen', {tpsId})}
          colorScheme={'danger'}>
          Upload Foto
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FomulirScreen;
