import React from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useParams } from "react-router-native";
import Text from "./Text";
import { RepositoryItem } from "../components/RepositoryList/RepositoryItem";
import theme from "../theme";
import useRepository from "../hooks/useRepository";
import { format, parseISO } from "date-fns";

const styles = StyleSheet.create({
  reviewFlexBox: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
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
    marginBottom: 15
  },
});


export const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} testID="repView" view />
    </View>
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => {
  return (
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
  );
};

const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useRepository({ id, first: 4 });

  
  if (loading || !data) {
    return (<View style={styles.loadingView}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>);
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  const onEndReach = async () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => 
        <View>
          <RepositoryInfo repository={repository} />
          <ItemSeparator></ItemSeparator>
        </View>
      }
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryView;