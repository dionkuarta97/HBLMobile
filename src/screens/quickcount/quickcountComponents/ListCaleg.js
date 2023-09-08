import {View, VStack, Text, HStack, Input} from 'native-base';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const ListCaleg = ({el, value = '', category, dat, handleChange, idn}) => {
  const {quickCountAnswer} = useSelector(state => state.homeReducer);
  const [vale, setVale] = useState(value);

  return (
    <View mb={5}>
      <Text mb={2} fontSize={17} underline fontWeight={'bold'}>
        {el.nama}
      </Text>

      <VStack space={2}>
        <HStack alignItems={'center'}>
          <Text fontSize={16}>Pemilih Partai</Text>
          <Input
            value={dat.caleg[0].jumlah.toString()}
            placeholder="0"
            onChangeText={text => handleChange(text, idn, 0)}
            keyboardType="numeric"
            marginLeft={'auto'}
            placeholderTextColor={'gray.500'}
            width={60}
            _focus={{
              backgroundColor: 'danger.100',
              borderColor: 'danger.400',
            }}
            variant={'filled'}
            borderColor={'gray.500'}
            textAlign={'right'}
            height={8}
          />
        </HStack>

        {el.caleg.map((val, index) => (
          <HStack key={index + 'caleg'} alignItems={'center'}>
            <Text fontSize={16}>Pemilih {val.nama}</Text>
            <Input
              value={dat.caleg[index + 1].jumlah.toString()}
              placeholder="0"
              onChangeText={text => handleChange(text, idn, index + 1)}
              keyboardType="numeric"
              marginLeft={'auto'}
              placeholderTextColor={'gray.500'}
              width={60}
              _focus={{
                backgroundColor: 'danger.100',
                borderColor: 'danger.400',
              }}
              variant={'filled'}
              borderColor={'gray.500'}
              textAlign={'right'}
              height={8}
            />
          </HStack>
        ))}
      </VStack>
    </View>
  );
};

export default ListCaleg;
