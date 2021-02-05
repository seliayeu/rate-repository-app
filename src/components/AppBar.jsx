import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: "#ffffff",
    margin: 10,
    marginBottom: 15,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text={"Repositories"} target=""/>
      <AppBarTab text={"Sign In"} target="signin"/>
    </ScrollView>
  </View>;
};

const AppBarTab = ({ text, target }) => {
  const linkText = () => {
    return (
      <TouchableWithoutFeedback>
        <Text style={styles.text} fontSize="subheading">
          {text}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Link to={`/${target}`} component={TouchableWithoutFeedback}>
      <Text style={styles.text} fontSize="subheading">
        {text}
      </Text>
    </Link>
  );
};

export default AppBar;