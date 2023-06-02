import {useSelector} from 'react-redux';

import {Image, Linking, Pressable, SafeAreaView} from 'react-native';
import {ScrollView, Text, View} from 'native-base';
import {heigth} from '../../Helper';
const {default: globalStyles} = require('../../GlobalStyles');

const JumlahPemilihScreen = () => {
  const {jumlahPemilih} = useSelector(state => state.homeReducer);

  const OpenWEB = url => {
    Linking.openURL(url);
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView p={4}>
        <Text color={'rgba(117, 117, 117, 1)'}>
          {jumlahPemilih?.length} pemilih tersambung
        </Text>
        {jumlahPemilih?.map((el, idx) => (
          <View
            alignItems={'center'}
            key={idx}
            paddingY={2}
            marginBottom={jumlahPemilih?.length === idx + 1 ? heigth / 15 : 0}
            borderColor={
              jumlahPemilih?.length === idx + 1
                ? 'rgba(224, 224, 224, 0)'
                : 'rgba(224, 224, 224, 1)'
            }
            borderBottomWidth={0.8}
            flexDirection={'row'}>
            <View width={'15%'}>
              <Image
                source={require('../../../assets/icons/profile-active.png')}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View width={'50%'}>
              <Text numberOfLines={2}>{el.nama}</Text>
            </View>
            <View
              alignItems={'flex-end'}
              justifyContent={'flex-end'}
              width={'35%'}>
              <Pressable
                onPress={() => {
                  OpenWEB('https://wa.me/' + el.notelp);
                }}
                style={({pressed}) => [
                  {
                    flexDirection: 'row',
                    paddingVertical: 8,
                    borderRadius: 5,
                    paddingHorizontal: 30,
                    backgroundColor: pressed
                      ? 'rgba(0, 195, 20, 0.6)'
                      : 'rgba(0, 195, 20, 1)',
                  },
                ]}>
                <Image
                  source={require('../../../assets/icons/wa.png')}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 8,
                    resizeMode: 'contain',
                  }}
                />
                <Text fontWeight={'semibold'} color={'white'}>
                  Hubungi
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JumlahPemilihScreen;
