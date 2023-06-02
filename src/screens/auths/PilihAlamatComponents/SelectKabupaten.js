import {Select, View} from 'native-base';
import {heigth} from '../../../Helper';
import {useLayoutEffect, useState} from 'react';
import LoadingModal from '../../../components/ModalLoading';
import {getKabupatenKota} from '../../../states/auth/authAction';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import DefaultBottomSheet from '../../../components/DefaultBottomSheet';

const SelectKabupaten = props => {
  const [kabKota, setKabKota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  useLayoutEffect(() => {
    setLoading(true);
    getKabupatenKota()
      .then(val => {
        setKabKota(val);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DefaultBottomSheet title="Kabupaten" onClose={() => props.onClose()}>
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
      {loading ? (
        <ActivityIndicator
          color={'rgba(0, 77, 153, 1)'}
          size={'large'}
          animating={true}
        />
      ) : (
        <FlatList
          style={{
            marginBottom: 20,
          }}
          keyExtractor={(item, index) => item.id + ''}
          data={kabKota?.filter(value =>
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
                    marginBottom:
                      index + 1 ===
                      kabKota?.filter(value =>
                        value.nama.toLowerCase().includes(search.toLowerCase()),
                      ).length
                        ? 100
                        : 0,
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
      )}
    </DefaultBottomSheet>
  );
};

export default SelectKabupaten;

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    paddingHorizontal: 10 * 2,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
