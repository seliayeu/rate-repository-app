import React from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Text from "../Text";
import theme from "../../theme";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  tinyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  mainFlexContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  },
  descriptionFlexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  profileFlexColumn: {
    margin: 10,
    marginRight: 5
  },
  textDescriptionColumn: {
    margin: 10,
    marginLeft: 10,
    flexShrink: 1
  },
  textDescriptionText: {
    marginBottom: 5,
  },
  languageItem: {
    backgroundColor: theme.colors.blueBackground,
    color: "#ffffff",
    padding: 4,
    borderRadius: 4
  },
  languageFlexContainer: {
    display: "flex",
    flexDirection: "row"
  },
  reactionsFlexContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  reactionItem: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  itemText: {
    textAlign: "center"
  },
  linkButton: {
    backgroundColor: theme.colors.blueBackground,
    color: "white",
    width: "95%",
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    margin: 10,
    borderRadius: 5,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground
  },
});

const Reaction = ({name, count}) => {
  const displayNumber = (number) => {
    if (parseInt(number) >= 1000) {
      return String((parseInt(number)/1000).toFixed(1)) + "k";
    }
    return count;
  };

  return (
    <View style={styles.reactionItem}>
      <Text fontWeight="bold" fontSize="subheading" style={styles.itemText}>
        {displayNumber(count)}
      </Text>
      <Text color="textSecondary" style={styles.itemText}>
        {name}
      </Text>
    </View>
  );
};

export const RepositoryItem = ({ item, testID, view }) => {
  const onPress = () => {
    Linking.openURL(item.url);
  };
  
  return (
    <View style={styles.mainFlexContainer}>
      <View style={styles.descriptionFlexContainer}>
        <View style={styles.profileFlexColumn}>
          <Image 
            style={styles.tinyAvatar}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
        </View>
        <View style={styles.textDescriptionColumn}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.textDescriptionText} testID={testID}>{item.fullName}</Text>
          <Text color="textSecondary" style={styles.textDescriptionText}>{item.description}</Text>
          <View style={styles.languageFlexContainer}>
            <Text style={styles.languageItem}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.reactionsFlexContainer}>
        <Reaction name="Stars" count={item.stargazersCount} />
        <Reaction name="Forks" count={item.forksCount} />
        <Reaction name="Reviews" count={item.reviewCount} />
        <Reaction name="Rating" count={item.ratingAverage} />
      </View>
      { view &&
        <TouchableWithoutFeedback onPress={onPress} testID="submitButton">
          <Text style={styles.linkButton}>Open in GitHub</Text>
        </TouchableWithoutFeedback>
      }
    </View>
  );
};

export default RepositoryItem;