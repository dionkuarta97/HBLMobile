import {Text} from 'native-base';
import {Image, Pressable} from 'react-native';

const PengaturanButton = ({name, onPress = () => {}}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderWidth: 1,
          marginBottom: 5,
          borderRadius: 5,
          borderColor: 'rgba(240, 236, 236, 1)',
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <Text color={name !== 'Log out' ? 'rgba(18, 18, 18, 1)' : '#FF5A26'}>
        {name}
      </Text>
      <Image
        source={
          name !== 'Log out'
            ? require('../../../../assets/icons/arrow.png')
            : require('../../../../assets/icons/arrow-red.png')
        }
        style={{
          marginLeft: 'auto',
          width: 20,
          height: 20,
          resizeMode: 'contain',
        }}
      />
    </Pressable>
  );
};

export default PengaturanButton;
