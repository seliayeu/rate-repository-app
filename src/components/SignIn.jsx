import React from 'react';
import { Formik } from "formik";
import Text from './Text';
import FormikTextInput from "./FormikTextInput";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import theme from '../theme';
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  signInFlexBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  signInButton: {
    backgroundColor: theme.colors.blueBackground,
    color: "white",
    width: "95%",
    textAlign: "center",
    padding: 15,
    fontSize: 15,
    margin: 10,
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
});

const SignIn = () => {
  const [ signIn, result ] = useSignIn();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      await signIn({ username, password });
      history.push("/home");
    } catch (e) {
      console.log(e);
    }
  
  };

  return (
    <SignInContainer onSubmit={onSubmit}/>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={{ username: "", password: "" }} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInFlexBox}>
      <FormikTextInput name="username" placeholder="Username" testID="usernameField" />
      <FormikTextInput name="password" placeholder="Password" testID="passwordField" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text style={styles.signInButton}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignIn;