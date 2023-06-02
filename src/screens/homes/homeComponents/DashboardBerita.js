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
      <Pressable
        onPress={() => {
          navigation.navigate('DetailBerita', {
            data: dashboardBerita?.berita[0],
          });
        }}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
            width: width / 1.2,
            marginRight: 20,
          },
        ]}>
        <Image
          source={{
            uri:
              'https://hillarybrigitta.id/upload/info/' +
              dashboardBerita?.berita[0].path,
          }}
          style={{
            alignSelf: 'center',
            width: '100%',
            height: heigth / 4,
            resizeMode: 'cover',
            borderRadius: 5,
          }}
        />
        <Text mt={1} fontWeight={'semibold'} numberOfLines={2}>
          {dashboardBerita?.berita[0].title}
        </Text>
      </Pressable>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 25,
          marginBottom: heigth / 20,
        }}>
        {dashboardBerita?.berita.map(
          (el, idx) =>
            idx !== 0 && (
              <Pressable
                onPress={() => {
                  navigation.navigate('DetailBerita', {data: el});
                }}
                key={el.id}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    width: width / 2.5,
                    marginRight: 20,
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
                <Text mt={1} fontWeight={'semibold'} numberOfLines={2}>
                  {el.title}
                </Text>
              </Pressable>
            ),
        )}
      </ScrollView>
    </>
  );
};

export default DashboardBerita;
