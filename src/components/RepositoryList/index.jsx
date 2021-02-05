import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import Text from "../Text";
import theme from "../../theme";
import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground
  },
  loadingView: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if (loading) {
    return (<View style={styles.loadingView}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>);
  }

  const repositories = data.repositories;
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <RepositoryItem item={item} />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
