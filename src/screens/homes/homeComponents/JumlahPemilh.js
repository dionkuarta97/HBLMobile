import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {View, Text} from 'native-base';
import {useCallback} from 'react';
import {Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet} from '../../../Helper';
import {getJumlahPemilih} from '../../../states/home/homeAction';

const JumlahPemilh = () => {
  const dispatch = useDispatch();
  const {jumlahPemilih} = useSelector(state => state.homeReducer);
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      checkInternet().then(val => {
        if (val) {
          dispatch(getJumlahPemilih());
        }
      });
    }, []),
  );

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('JumlahPemilihScreen');
      }}
      style={({pressed}) => [
        {opacity: pressed ? 0.5 : 1, padding: 15, alignItems: 'center'},
      ]}>
      <View flexDirection={'row'} alignItems={'center'}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 30,
            backgroundColor: 'rgba(246, 192, 0, 1)',
            marginRight: 3,
          }}
        />
        <Text color={'rgba(0, 77, 153, 1)'} fontWeight={'semibold'}>
          Jumlah Pemilih
        </Text>
      </View>
      <View mt={3} flexDirection={'row'} alignItems={'center'}>
        <Image
          source={require('../../../../assets/icons/grup.png')}
          style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            marginRight: 5,
          }}
        />
        <Text fontSize={17}>{jumlahPemilih?.length}</Text>
      </View>
    </Pressable>
  );
};

export default JumlahPemilh;
