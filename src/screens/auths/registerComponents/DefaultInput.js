import {Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import globalStyles from '../../../GlobalStyles';
import {formatEmail, passwordValidations} from '../../../Helper';
import {useCallback, useState} from 'react';

const DefaultInput = ({
  label,
  value,
  handleChange,
  name,
  inputMode = 'none',
  placeholder,
  secureTextEntry = false,
  autoCapitalize,
  re,
}) => {
  const [foccus, setFocus] = useState(false);
  const handleFocus = useCallback(val => {
    setFocus(val);
  }, []);
  return (
    <>
      <Text
        style={{
          marginBottom: 5,
          color: 'rgba(185, 185, 185, 1)',
        }}>
        {label}
      </Text>
      <TextInput
        maxLength={name === 'nik' ? 16 : 2553}
        autoCapitalize={autoCapitalize}
        onFocus={() => {
          handleFocus(true);
        }}
        secureTextEntry={secureTextEntry}
        value={value}
        inputMode={inputMode}
        onChange={e => {
          handleChange(e, name);
        }}
        placeholder={placeholder}
        style={globalStyles.inputStyle}
      />
      {foccus ? (
        <>
          {secureTextEntry && re === undefined ? (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {passwordValidations(value).valid
                ? ' '
                : passwordValidations(value).error.map((el, idx) =>
                    idx === passwordValidations(value).error.length - 1
                      ? ' ' + el + '.'
                      : idx !== 0
                      ? ' ' + el + ', '
                      : '*' + el + ', ',
                  )}
            </Text>
          ) : secureTextEntry && re !== undefined ? (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {re !== value || re === '' ? `*password tidak sama` : ' '}
            </Text>
          ) : inputMode === 'email' ? (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {!formatEmail(value) ? `*format email salah` : ' '}
            </Text>
          ) : name === 'nik' ? (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {value.length !== 16 ? `*nik harus 16 karakter` : ' '}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 13,
                color: '#c80b0b',
                marginTop: 2,
              }}>
              {value === '' ? `*${name} tidak boleh kosong` : ' '}
            </Text>
          )}
        </>
      ) : (
        <Text
          style={{
            fontSize: 13,
            color: '#c80b0b',
            marginTop: 2,
          }}>
          {' '}
        </Text>
      )}
    </>
  );
};

export default DefaultInput;
