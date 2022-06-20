import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import ItemSeparator from "./ItemSeperator";

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
  },
});

const sortOptions = [
  {
    label: "Latest repositories",
    value: 0,
    variables: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    },
  },
  {
    label: "Highest rated repositories",
    value: 1,
    variables: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
  },
  {
    label: "Lowest rated repositories",
    value: 2,
    variables: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  },
];

const SelectOrder = ({ onSelect, selected }) => {
  return (
    <Picker
      selectedValue={selected}
      onValueChange={(value) => {
        if (onSelect) {
          onSelect(value);
        }
      }}
    >
      {sortOptions.map((o) => (
        <Picker.Item key={o.label} label={o.label} value={o.value} />
      ))}
    </Picker>
  );
};

const SearchFilter = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 500);
  useEffect(() => {
    if (onChange) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);
  return (
    <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={(v) => {
        setValue(v);
      }}
      value={value}
    />
  );
};

const RepositoryHeader = ({ onSearchChange, onSelectSort, selectedSort }) => {
  return (
    <View>
      <SearchFilter onChange={onSearchChange} />
      <SelectOrder onSelect={onSelectSort} selected={selectedSort} />
    </View>
  );
};
export const RepositoryListContainer = ({
  onSearchChange,
  selectedSort,
  onSelectSort,
  repositories,
  onEndReached,
}) => {
  const nodes =
    repositories && repositories.edges
      ? repositories.edges.map((e) => e.node)
      : [];
  const handleRender = ({ item }) => {
    return <RepositoryItem item={item} />;
  };
  return (
    <FlatList
      data={nodes}
      onEndReached={onEndReached}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={handleRender}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <RepositoryHeader
          onSearchChange={onSearchChange}
          selectedSort={selectedSort}
          onSelectSort={onSelectSort}
        />
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [searchValue, setSearchValue] = useState("");
  const { repositories, fetchMore } = useRepositories({
    ...sortOptions[selectedSort].variables,
    searchKeyword: searchValue,
    first: 8,
  });
  const handleSelectSort = (value) => {
    setSelectedSort(value);
  };
  const handleSearchFilter = (value) => {
    setSearchValue(value);
  };
  const handleEndReached = () => {
    fetchMore();
  }
  return (
    <RepositoryListContainer
      onSelectSort={handleSelectSort}
      selectedSort={selectedSort}
      repositories={repositories}
      onSearchChange={handleSearchFilter}
      onEndReached={handleEndReached}
    />
  );
};

export default RepositoryList;
