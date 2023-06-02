import {Text, View} from 'native-base';
import {heigth, width} from '../../../Helper';
import {Image, Pressable} from 'react-native';

const BeritaCard = ({data, navigation}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('DetailBerita', {data: data});
      }}
      style={({pressed}) => [
        {
          flexDirection: 'row',
          padding: 4,
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <Image
        source={{uri: 'https://hillarybrigitta.id/upload/info/' + data.path}}
        style={{
          resizeMode: 'cover',
          width: '33%',
          height: heigth / 8,
          borderRadius: 4,
        }}
      />
      <View justifyContent={'center'} width={'63%'} ml={2}>
        <Text fontWeight={'bold'} numberOfLines={2}>
          {data.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default BeritaCard;
