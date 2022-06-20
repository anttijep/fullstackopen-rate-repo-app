import { View, StyleSheet } from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import useRepositoryInfo from "../hooks/useRepositoryInfo";
import ItemSeparator from "./ItemSeperator";

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
  },
});

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem style={styles.header} singleView item={repository} />
);

const SingleRepository = ({ id }) => {
  const { repository, loading, error, fetchMore } = useRepositoryInfo({
    repositoryId: id,
    first: 7,
  });

  if (loading) {
    return null;
  }
  if (error) {
    console.error(error.message);
    return null;
  }
  if (!repository) {
    return (
      <View>
        <Text>No repository with id {`'${id}'`} found</Text>
      </View>
    );
  }
  const handleEndReached = () => {
    fetchMore();
  };
  const reviews = repository.reviews
    ? repository.reviews.edges.map((e) => e.node)
    : null;
  const handleReviewRender = ({ item }) => {
    return <ReviewItem review={item} />;
  };
  return (
    <>
      <FlatList
        data={reviews}
        renderItem={handleReviewRender}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
      />
    </>
  );
};

export default SingleRepository;
