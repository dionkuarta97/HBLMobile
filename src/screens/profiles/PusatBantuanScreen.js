import {Image, Pressable, SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getBantuan} from '../../states/auth/authAction';
import {ScrollView, Text, View} from 'native-base';
import {heigth} from '../../Helper';
import {useNavigation} from '@react-navigation/native';

const PusatBantuanScreen = () => {
  const {bantuan} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getBantuan());
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView p={4}>
        {bantuan?.map((el, idx) => (
          <Pressable
            onPress={() => {
              navigation.navigate('DetailBantuanScreen', {detail: el});
            }}
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 0.7,
                borderColor: idx + 1 === bantuan.length ? 'white' : 'gray',
                paddingVertical: 10,
                marginBottom: idx + 1 === bantuan.length ? heigth / 10 : 4,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            key={idx}>
            <View width={'85%'}>
              <Text fontWeight={'bold'} fontSize={16} numberOfLines={2}>
                {el.judul}
              </Text>
            </View>
            <Image
              style={{
                resizeMode: 'contain',
                width: '10%',
                height: 15,
                marginLeft: 'auto',
              }}
              source={require('../../../assets/icons/arrow.png')}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default PusatBantuanScreen;
