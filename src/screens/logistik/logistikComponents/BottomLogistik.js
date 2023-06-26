import {heigth} from '../../../Helper';

const {Actionsheet, Text} = require('native-base');
const {Image, Pressable} = require('react-native');

const BottomLogistik = ({isOpen, onClose}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Image
          source={require('../../../../assets/survey-sukses.png')}
          style={{
            resizeMode: 'cover',
            width: '80%',
            height: heigth / 8,
            borderRadius: 8,
          }}
        />
        <Text
          color={'rgba(85, 85, 85, 1)'}
          fontWeight={'bold'}
          mb={1}
          marginTop={4}>
          Laporan logistik diterima
        </Text>
        <Text color={'rgba(153, 153, 153, 1)'}>
          laporan sudah dilaporkan ke koordinator
        </Text>
        <Pressable
          onPress={onClose}
          style={({pressed}) => [
            {
              width: '95%',
              alignItems: 'center',
              marginVertical: 20,
              paddingVertical: 8,
              borderRadius: 6,
              backgroundColor: pressed
                ? 'rgba(220, 53, 69, 0.7)'
                : 'rgba(220, 53, 69, 1)',
            },
          ]}>
          <Text color={'rgba(255, 255, 255, 1)'}>Mengerti</Text>
        </Pressable>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default BottomLogistik;
