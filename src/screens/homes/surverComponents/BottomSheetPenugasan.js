import {memo, useEffect, useState} from 'react';
import {checkInternet, heigth, width} from '../../../Helper';
import {useDispatch, useSelector} from 'react-redux';
import {getPenugasan} from '../../../states/survey/surveyAction';

const {Actionsheet, Text, ScrollView, View} = require('native-base');
const {Image, Pressable, ActivityIndicator, Alert} = require('react-native');

const BottomSheetPenugasan = ({isOpen, onClose, onPress, userId}) => {
  const {penugasan} = useSelector(state => state.surveyReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    setLoading(true);
    checkInternet().then(data => {
      if (data) {
        dispatch(getPenugasan(userId)).finally(() => {
          setLoading(false);
        });
      }
    });
  }, []);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content height={heigth / 3}>
        <Text fontSize={18} fontWeight={'bold'}>
          Pilih Daerah Penugasan
        </Text>
        {loading && (
          <ActivityIndicator
            color={'rgba(0, 77, 153, 1)'}
            size={'large'}
            animating={true}
          />
        )}
        <ScrollView width={width / 1.1} mt={4} flex={1}>
          {penugasan?.map((el, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                Alert.alert('warning', 'apakah anda yakin?', [
                  {
                    text: 'Tidak',
                    onPress: () => {},
                  },
                  {
                    text: 'Ya',
                    onPress: () => {
                      onPress(el.id_daerah);
                    },
                  },
                ]);
              }}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor:
                    idx + 1 === penugasan.length
                      ? 'rgba(0, 77, 153, 0)'
                      : 'black',
                },
              ]}>
              <Text fontSize={18}>{el.nama}</Text>
              <Image
                source={require('../../../../assets/icons/arrow.png')}
                style={{
                  marginLeft: 'auto',
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default memo(BottomSheetPenugasan);
