import {Image, SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {useRoute} from '@react-navigation/native';
import {ScrollView, Text, View} from 'native-base';
import {heigth, width} from '../../Helper';
import {useState} from 'react';
import RenderHTML from 'react-native-render-html';

const DetailBerita = () => {
  const route = useRoute();
  const {data} = route.params;
  const [date, setDate] = useState(new Date(data.date));

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView padding={4}>
        <Image
          source={{uri: 'https://masa-depan.id/upload/info/' + data.path}}
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: heigth / 3,
            borderRadius: 5,
          }}
        />
        <Text fontSize={17} marginY={4} fontWeight={'bold'}>
          {data.title}
        </Text>
        <Text color={'rgba(165, 165, 165, 1)'}>
          {date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }) +
            ' ' +
            date.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
          WIB
        </Text>

        <RenderHTML
          ignoredDomTags={['iframe']}
          source={{
            html: data.content,
          }}
          contentWidth={width / 1.2}
          baseStyle={{
            marginBottom: 40,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBerita;
