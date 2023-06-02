import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import {heigth, width} from '../Helper';

const LoadingModal = ({text = 'Mohon tunggu'}) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.dimBackground} />
        <View style={styles.body}>
          <ActivityIndicator
            color={'rgba(0, 77, 153, 1)'}
            size={'large'}
            animating={true}
          />
          <Text color={'rgba(0, 77, 153, 1)'} mt={2}>
            {text}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  dimBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  body: {
    width: width * 0.7,
    maxHeight: heigth * 0.3,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
