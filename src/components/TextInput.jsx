import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from "../theme";

const styles = StyleSheet.create({
  errorStyle: {
    borderColor: theme.colors.error,
    borderRadius: 5,
    borderWidth: 1
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  error && textInputStyle.push(styles.errorStyle);

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;