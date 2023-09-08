import {Text, View} from 'native-base';
import {Pressable, TextInput, Alert} from 'react-native';
import globalStyles from '../../../GlobalStyles';
import {heigth, width} from '../../../Helper';
import {useRef} from 'react';

const Searching = ({value, onChange, onPress}) => {
  const ref = useRef();
  return (
    <View p={4}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={val => onChange(val)}
        placeholder="masukan nik"
        style={globalStyles.inputStyle}
      />
      <Pressable
        disabled={value === '' ? true : false}
        onPress={() => {
          if (value.length !== 16) {
            Alert.alert('Terjadi Kesalahan', 'nik wajib 16 karakter');
          } else {
            onPress();
            ref.current?.blur();
          }
        }}
        style={({pressed}) => [
          {
            transform: [
              {
                scale: pressed ? 0.99 : 1,
              },
            ],
            alignSelf: 'center',
            width: width / 1.1,
            alignItems: 'center',
            marginVertical: 15,
            backgroundColor: pressed
              ? 'rgba(220, 53, 69, 0.8)'
              : 'rgba(220, 53, 69, 1)',
            padding: 15,
            borderRadius: 8,
          },
        ]}>
        <Text
          style={{
            color: 'white',
          }}>
          Cari
        </Text>
      </Pressable>
    </View>
  );
};

export default Searching;
