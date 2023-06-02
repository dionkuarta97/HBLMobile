import {Modal, StyleSheet, View} from 'react-native';
import {width} from '../Helper';

const DefaultModal = ({children}) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.dimBackground} />
        <View style={styles.body}>{children}</View>
      </View>
    </Modal>
  );
};

export default DefaultModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dimBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  body: {
    borderRadius: 10,
    width: width * 0.75,
    backgroundColor: 'white',
    padding: 20,
  },
});
