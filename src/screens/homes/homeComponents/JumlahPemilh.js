import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {View, Text} from 'native-base';
import {useCallback} from 'react';
import {Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {checkInternet, heigth, width} from '../../../Helper';
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
        {
          padding: 15,
          width: width / 1.3,
          alignSelf: 'center',
          top: heigth / 22,
          borderRadius: 10,
          alignItems: 'center',
          backgroundColor: pressed ? 'rgba(76,76,76, 1)' : 'black',
        },
      ]}>
      <View flexDirection={'row'} alignItems={'center'}>
        <Text color={'white'} fontWeight={'semibold'}>
          Jumlah Pemilih
        </Text>
      </View>
      <View mt={3} flexDirection={'row'} alignItems={'center'}>
        <Text color={'white'} fontSize={17}>
          {jumlahPemilih?.length}
        </Text>
      </View>
    </Pressable>
  );
};

export default JumlahPemilh;
