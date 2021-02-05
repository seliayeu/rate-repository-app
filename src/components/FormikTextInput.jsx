import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
    width: "95%",
    textAlign: 'left'
  },
  textBox: {
    width: "95%",
    margin: 10,
    padding: 10,
    marginBottom: 0, 
    paddingLeft: 15,
    color: theme.colors.textSecondary,
    fontSize: 15,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 5
    }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={styles.textBox}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
