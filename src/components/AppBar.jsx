import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import { Link } from "react-router-native";
import theme from "../theme";
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../utils/apolloClient';
import AuthStorageContext from '../contexts/AuthStorageContext';

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
  const { data, error, loading } = useQuery(CURRENT_USER);
  console.log(data);

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text={"Repositories"} target=""/>
      {
        !loading && 
          data.authorizedUser === null ?
            ( 
              <>
                <AppBarTab text={"Sign In"} target="signin"/>
                <AppBarTab text={"Sign Up"} target="signup"/>
              </> )
          : 
            ( <>
                <AppBarTab text="Create a review" target="review"/>
                <SignOut />
              </> )
        }
    </ScrollView>
  </View>;
};

const AppBarTab = ({ text, target }) => {

  return (
    <Link to={`/${target}`} component={TouchableWithoutFeedback}>
      <Text style={styles.text} fontSize="subheading">
        {text}
      </Text>
    </Link>
  );
};


const SignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    console.log("test");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return (
    <TouchableWithoutFeedback onPress={signOut}>
      <Text style={styles.text} fontSize="subheading">
        Sign Out
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBar;