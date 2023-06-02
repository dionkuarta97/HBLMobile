import {StyleSheet} from 'react-native';
import {heigth} from './Helper';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputStyle: {
    borderWidth: 0.8,
    borderRadius: 8,
    borderColor: 'rgba(214, 228, 236, 1)',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(251, 251, 251, 1)',
    height: heigth / 18,
  },
});

export default globalStyles;
