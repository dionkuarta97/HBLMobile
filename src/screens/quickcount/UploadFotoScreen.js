import {SafeAreaView} from 'react-native';
import globalStyles from '../../GlobalStyles';
import {Button, Center, HStack, ScrollView, VStack, View} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react';
import {heigth, width} from '../../Helper';
import {Image, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LoadingModal from '../../components/ModalLoading';
import {kirimQuickCount} from '../../states/reactQuery';
const UploadFotoScreen = () => {
  const [images, setImages] = useState([]);
  const route = useRoute();
  const {quickCountAnswer} = useSelector(state => state.homeReducer);
  const {tpsId} = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView flex={1} p={4}>
        <VStack space={4}>
          {images.map((el, idx) => (
            <Center key={idx}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: width / 1.2,
                  height: heigth / 3,
                }}
                source={{uri: el.uri}}
              />
              <Button
                colorScheme={'danger'}
                onPress={() => {
                  let temp = images.filter(val => val.uri !== el.uri);
                  setImages(temp);
                }}
                mt={2}>
                Hapus
              </Button>
            </Center>
          ))}
        </VStack>
        <HStack my={4} space={4} justifyContent={'center'}>
          <Button
            onPress={async () => {
              const result = await launchImageLibrary();
              setImages([
                ...images,
                {
                  fileName: result.assets[0].fileName,
                  uri: result.assets[0].uri,
                  type: result.assets[0].type,
                },
              ]);
            }}
            colorScheme={'amber'}>
            Upload Foto
          </Button>
          <Button
            onPress={async () => {
              const result = await launchCamera();
              setImages([
                ...images,
                {
                  fileName: result.assets[0].fileName,
                  uri: result.assets[0].uri,
                  type: result.assets[0].type,
                },
              ]);
            }}
            colorScheme={'success'}>
            Ambil Foto
          </Button>
        </HStack>
        {loading && <LoadingModal />}
        <Button
          onPress={async () => {
            try {
              setLoading(true);
              const form = new FormData();

              images.map((el, idx) => {
                form.append(`images[]`, {
                  uri: el.uri,
                  type: el.type,
                  name: el.fileName,
                });
              });
              let ans = [];
              for (const val of quickCountAnswer) {
                for (const vl of val.answer) {
                  for (const v of vl.caleg) {
                    ans.push({
                      id_tps: v.id_tps,
                      id_caleg: v.id_caleg,
                      id_partai: v.id_partai,
                      jumlah: v.jumlah,
                    });
                  }
                }
              }

              ans.map((el, idx) => {
                form.append(`answer[${idx}][id_tps]`, el.id_tps);
                form.append(`answer[${idx}][id_caleg]`, el.id_caleg);
                form.append(`answer[${idx}][id_partai]`, el.id_partai);
                form.append(`answer[${idx}][jumlah]`, el.jumlah);
              });

              console.log(form);
              const data = await kirimQuickCount(form, tpsId);
              setLoading(false);
              if (data) {
                Alert.alert('berhasil', 'data berhasil dikirim', [
                  {
                    text: 'oke',
                    onPress: () => navigation.replace('HomeScreen'),
                  },
                ]);
              }
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
          my={4}>
          Kirim Hasil
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadFotoScreen;
