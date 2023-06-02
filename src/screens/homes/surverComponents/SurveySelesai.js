import {ScrollView, Text, View} from 'native-base';
import {Image} from 'react-native';
import {heigth} from '../../../Helper';

const SurveySelesai = ({data, total}) => {
  return (
    <ScrollView p={4}>
      <Text mb={4} color={'rgba(117, 117, 117, 1)'}>
        {total ? total : data?.length} Survey
      </Text>
      {data?.map((el, idx) => (
        <View
          style={{
            opacity: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 10,
            marginBottom: idx + 1 === data?.length ? heigth / 15 : 0,
            borderColor:
              idx + 1 === data?.length
                ? 'rgba(224, 224, 224, 0)'
                : 'rgba(224, 224, 224, 1)',
          }}
          key={idx + 'asdas'}>
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
          <View width={'65%'} ml={4}>
            <Text numberOfLines={1} fontWeight={'semibold'}>
              {el.survey.judul}
            </Text>
            <Text color={'rgba(97, 97, 97, 1)'} numberOfLines={1}>
              total selesai : {el.total}
            </Text>
          </View>
          <View ml={'auto'}>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
              source={require('../../../../assets/icons/check.png')}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default SurveySelesai;
