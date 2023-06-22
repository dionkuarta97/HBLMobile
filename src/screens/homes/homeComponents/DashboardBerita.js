import {Text, View} from 'native-base';
import {Image, Pressable, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {heigth, width} from '../../../Helper';
import {useNavigation} from '@react-navigation/native';

const DashboardBerita = () => {
  const {dashboardBerita} = useSelector(state => state.homeReducer);
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}>
        {dashboardBerita?.berita.map((el, idx) => (
          <Pressable
            onPress={() => {
              navigation.navigate('DetailBerita', {data: el});
            }}
            key={el.id}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row',

                width: width / 2.5,
                marginBottom: 20,
              },
            ]}>
            <Image
              source={{
                uri: 'https://hillarybrigitta.id/upload/info/' + el.path,
              }}
              style={{
                width: '100%',
                height: heigth / 8,
                resizeMode: 'cover',

                borderRadius: 5,
              }}
            />
            <Text ml={4} fontWeight={'semibold'} numberOfLines={2}>
              {el.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default DashboardBerita;
