import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";
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
  owner: yup
    .string()
    .required("Repository owner name is required"),
  name: yup
    .string()
    .required("Repository name is required"),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required("Rating is required"),
  review: yup
    .string()
    .optional()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.reviewFlexBox}>
      <FormikTextInput name="owner" placeholder="Repository owner name"/>
      <FormikTextInput name="name" placeholder="Repository name"/>
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100"/>
      <FormikTextInput name="review" placeholder="Review"/>
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <Text style={styles.createButton}>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={ { username: "", name: "", rating: "", review: "" } }
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [ create, result ] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { owner, name, rating, review } = values;
    console.log(values);
    try {
      const data = await create({name, owner, rating, review});
      history.push(`/repo/${data.createReview.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewContainer onSubmit={onSubmit}/>
  );
};

export default CreateReview;