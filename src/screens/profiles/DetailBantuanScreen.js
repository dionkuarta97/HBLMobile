import {SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {useRoute} from '@react-navigation/native';
import {Text, View} from 'native-base';

const DetailBantuanScreen = () => {
  const route = useRoute();
  const {detail} = route.params;
  console.log(detail);
  return (
    <SafeAreaView style={globalStyles.container}>
      <View padding={4}>
        <Text marginBottom={14} fontWeight={'bold'} fontSize={17}>
          {detail.judul}
        </Text>
        <Text>{detail.solusi}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailBantuanScreen;
