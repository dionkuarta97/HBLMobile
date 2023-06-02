import React, {useLayoutEffect, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import DefaultBottomSheet from '../../../components/DefaultBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {getPartai} from '../../../states/survey/surveyAction';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SelectPartai = props => {
  const [search, setSearch] = useState('');
  const {listPartai} = useSelector(state => state.surveyReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getPartai());
  }, []);

  return (
    <DefaultBottomSheet title="Partai Politik" onClose={() => props.onClose()}>
      <View style={styles.search}>
        <TextInput
          placeholder="Cari"
          style={{
            flex: 1,
            paddingVertical: 10,
          }}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        style={{
          marginBottom: 50,
          maxHeight: Dimensions.get('screen').height / 4,
          minHeight: Dimensions.get('screen').height / 4,
        }}
        keyExtractor={(item, index) => item.id + ''}
        data={listPartai?.filter(value =>
          value.nama.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={({item, index}) => {
          return (
            <Pressable
              style={({pressed}) => [
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10 * 1.5,
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgrey',
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
              key={`kabkota-${item.id}`}
              onPress={() => props.onSelect(item)}>
              <Text style={{flex: 1}}>{item.nama}</Text>
              <View
                style={{
                  paddingHorizontal: 20 / 2,
                }}
              />
            </Pressable>
          );
        }}
      />
    </DefaultBottomSheet>
  );
};

export default SelectPartai;

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    paddingHorizontal: 10 * 2,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
