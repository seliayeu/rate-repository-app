import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import useRepositories from "../../hooks/useRepositories";
import { Link, useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';

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

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onPress = (id) => {
    history.push(`/repo/${id}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {onPress(item.id)}}>
      <RepositoryItem item={item} testID={item.id} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if (loading) {
    return (<View style={styles.loadingView}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>);
  }

  const repositories = data.repositories;

  return <>
    <RepositoryListContainer repositories={repositories} />
  </>;
};

export default RepositoryList;
