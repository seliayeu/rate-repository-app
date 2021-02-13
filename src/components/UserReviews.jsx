import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, TouchableWithoutFeedback, Alert } from "react-native";
import theme from "../theme";
import useGetUser from "../hooks/useGetUser";
import { ItemSeparator } from "./RepositoryView";
import Text from "./Text";
import { format, parseISO } from "date-fns";
import { useHistory } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  reviewOuterBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  reviewFlexBox: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 5
  },
  rating: {
    color: theme.colors.blueBackground,
    borderWidth: 2,
    width: 40,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: theme.colors.blueBackground,
    padding: 10,
    margin: 10
  },
  reviewInfo: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    flexShrink: 1,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground
  },
  reviewText: {
    flexWrap: "wrap",
    marginBottom: 5
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  viewButton: {
    backgroundColor: theme.colors.blueBackground,
    color: "white",
    width: "45%",
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    margin: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#c9392e",
    color: "white",
    width: "45%",
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    margin: 10,
    borderRadius: 5,
  }
});

export const ReviewItem = ({ review, onView, onDelete }) => {

  return (
    <View style={styles.reviewOuterBox}>
      <View style={styles.reviewFlexBox}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={styles.reviewInfo}>
          <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
          <Text color="textSecondary">{format(parseISO(review.createdAt), "d.M.y")}</Text>
          { review.text != "" && 
            <Text style={styles.reviewText}>{review.text}</Text>
          }
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableWithoutFeedback onPress={() => {onView(review)}}>
          <Text style={styles.viewButton}>View repository</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Delete", onPress: () => {
                onDelete(review);
              } }
            ],
            { cancelable: false }
          );   
        }}>
        <Text style={styles.deleteButton}>Delete repository</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
  );
};


const UserReview = () => {
  const [ data, loading, refetch ] = useGetUser(true);
  const history = useHistory();
  const [deleteReview, result] = useDeleteReview();

  const onDelete = async (review) => {
    await deleteReview(review.id);
    refetch();
  };

  if (loading || !data || !data.authorizedUser) {
    return (<View style={styles.loadingView}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>);
  }

  const onView = (review) => {
    history.push(`/repo/${review.repository.id}`);
  };



  const user = data.authorizedUser;
  const reviews = user.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} onView={onView} onDelete={onDelete}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReview;