import React from 'react';

import {
  Dimensions,
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const DefaultBottomSheet = props => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onClose()}>
          <View style={styles.dimBackground} />
        </TouchableWithoutFeedback>
        <View style={styles.dialog}>
          <View style={styles.contentHeader}>
            <Text style={{flex: 1, fontSize: 17, fontWeight: 'bold'}}>
              {props.title}
            </Text>
            <TouchableOpacity onPress={() => props.onClose()}>
              <View style={styles.closeContainer}>
                <Text style={{fontWeight: 'bold'}}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10 * 2}}>{props.children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default DefaultBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: 'relative',
  },
  dimBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  dialog: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    padding: 10 * 2,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  closeContainer: {
    borderRadius: 100,
    width: 30,
    height: 30,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
