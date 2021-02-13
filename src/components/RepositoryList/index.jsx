import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import useRepositories from "../../hooks/useRepositories";
import { useHistory } from "react-router-native";
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";

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

export class RepositoryListContainer extends React.Component {
  render () {
    const { data, loading } = this.props;
  
    const onPress = (id) => {
      const { history } = this.props;
      history.push(`/repo/${id}`);
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => {onPress(item.id)}}>
        <RepositoryItem item={item} testID={item.id} />
      </TouchableOpacity>
    );
    const { searchQuery, handleSearch, value, onChange, onEndReach, setValue } = this.props;

    const repositoryNodes = !loading
    ? data.repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={      
          <> 
            <Searchbar
              placeholder="Search"
              onChangeText={handleSearch}
              value={searchQuery}
            />
            <RNPickerSelect
            onValueChange={(value) => {
              setValue(value);
              onChange();}}
            items={[
                { label: 'Latest repositories', value: 'latest' },
                { label: 'Highest rated repositories', value: 'highest' },
                { label: 'Lowest rated repositories', value: 'lowest' },
            ]}
            value={value}
            style={styles.dropDownStyle}
            />
          </>
        }
      />
    );
  }
}

export class Header extends React.Component {
  render(){
    const { onChange, setValue, value, handleSearch, searchQuery } = this.props;

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <RNPickerSelect
        onValueChange={(value) => {
          setValue(value);
          onChange();}}
        items={[
            { label: 'Latest repositories', value: 'latest' },
            { label: 'Highest rated repositories', value: 'highest' },
            { label: 'Lowest rated repositories', value: 'lowest' },
        ]}
        value={value}
        style={styles.dropDownStyle}
        />
      </>
  );}
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [value, setValue] = useState("highest");
  const [searchQuery, setSearchQuery] = useState("");
  const [search] = useDebounce(searchQuery, 500);
  const { data, loading, fetchMore } = useRepositories({ orderBy, orderDirection, search, first: 8 });
  const history = useHistory();

  const handleSearch = (value) => {
    console.log("handleSearch");
    console.log(value);
    setSearchQuery(value);
  };

  const onChange = () => {
    switch (value) {
      case "highest":
        setOrderDirection("DESC");
        setOrderBy("CREATED_AT");
        break;
      case "latest":
        console.log("EPIC");
        setOrderDirection("DESC");
        setOrderBy("RATING_AVERAGE");
        break;
      case "lowest":
        setOrderDirection("ASC");
        setOrderBy("RATING_AVERAGE");
        break;
      default:
        return null;
    }
  };

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };


  return <RepositoryListContainer
    loading={loading}
    history={history}
    data={data}
    onChange={onChange}
    setValue={setValue}
    value={value}
    searchQuery={searchQuery}
    handleSearch={handleSearch}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;
