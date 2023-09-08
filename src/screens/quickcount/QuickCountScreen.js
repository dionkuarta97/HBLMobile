import {SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {Button, Text, View} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
const QuickCountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {tpsId} = route.params;
  console.log(tpsId);
  return (
    <SafeAreaView style={globalStyles.container}>
      <View p={4}>
        <Button
          onPress={() => navigation.navigate('FomulirScreen', {tpsId})}
          colorScheme={'danger'}>
          Isi Fomulir
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default QuickCountScreen;
