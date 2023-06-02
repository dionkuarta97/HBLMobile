import {Text} from 'native-base';
import React from 'react';
import {Image, TextInput, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {heigth} from '../Helper';

const OnTapTextInput = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => props.onTap()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
          borderWidth: 0.8,
          borderRadius: 5,
          paddingHorizontal: 10,
          height: heigth / 18,
          borderColor: 'rgba(214, 228, 236, 1)',
        }}>
        <Text color={props.value ? 'black' : 'rgba(117, 117, 117, 1)'}>
          {props.value ? props.value.nama : props.placeholder}
        </Text>
        <View style={{paddingHorizontal: 10, marginLeft: 'auto'}}>
          <Image
            source={require('../../assets/icons/select.png')}
            style={{
              resizeMode: 'contain',
              height: 15,
              width: 15,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OnTapTextInput;
