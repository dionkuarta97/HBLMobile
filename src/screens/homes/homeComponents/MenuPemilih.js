import {Text, View} from 'native-base';
import {Image, Pressable} from 'react-native';

const MenuPemilih = ({survey, pengaduan, navigation}) => {
  return (
    <View flexWrap={'wrap'} flexDirection={'row'}>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('SurveyScreen');
          }}
          style={({pressed}) => [
            {
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
              backgroundColor: pressed
                ? 'rgba(255, 124, 51, 0.8)'
                : 'rgba(255, 124, 51, 1)',
              padding: 10,
              borderRadius: 5,
            },
          ]}>
          <Image
            source={require('../../../../assets/icons/survey.png')}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
            }}
          />
          {survey > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -8,
                backgroundColor: 'rgba(220, 53, 69, 1)',
                elevation: 4,
                width: 22,
                height: 22,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <Text fontSize={13} fontWeight={'semibold'} color={'white'}>
                {survey}
              </Text>
            </View>
          )}
        </Pressable>
        <Text mt={1} color={'rgba(150, 150, 150, 1)'} fontSize={14}>
          Survey
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('PengaduanScreen');
          }}
          style={({pressed}) => [
            {
              transform: [
                {
                  scale: pressed ? 0.98 : 1,
                },
              ],
              backgroundColor: pressed
                ? 'rgba(233, 63, 52, 0.8)'
                : 'rgba(233, 63, 52, 1)',
              padding: 10,
              borderRadius: 5,
            },
          ]}>
          <Image
            source={require('../../../../assets/icons/pengaduan.png')}
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
            }}
          />
          {pengaduan > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -8,
                backgroundColor: 'rgba(220, 53, 69, 1)',
                elevation: 4,
                width: 22,
                height: 22,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <Text fontSize={13} fontWeight={'semibold'} color={'white'}>
                {pengaduan}
              </Text>
            </View>
          )}
        </Pressable>
        <Text mt={1} color={'rgba(150, 150, 150, 1)'} fontSize={14}>
          Pengaduan
        </Text>
      </View>
    </View>
  );
};

export default MenuPemilih;
