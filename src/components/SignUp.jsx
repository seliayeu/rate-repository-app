import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router-native";


const styles = StyleSheet.create({
  reviewFlexBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  createButton: {
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
    .min(1)
    .max(30)
    .required("Username is required"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("Password is required"),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.reviewFlexBox}>
      <FormikTextInput name="username" placeholder="Username"/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="confirmation" placeholder="Password confirmation" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text style={styles.createButton}>Sign up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={ { username: "", password: "", confirmation: "" } }
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [ signUp, signUpresult ] = useSignUp();
  const [ signIn, signInresult ] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(values);
    try {
      const data = await signUp({ username, password });
      if (data.createUser.id != null) {
        await signIn({ username, password});
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit}/>
  );
};

export default SignUp;