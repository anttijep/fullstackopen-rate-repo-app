import { FlatList, Alert } from "react-native";
import useCurrentUser from "../hooks/useCurrentUser";
import ItemSeparator from "./ItemSeperator";
import ReviewItem from "./ReviewItem";
import useDeleteReview from "../hooks/useDeleteReview";
import { useNavigate } from "react-router-native";

const MyReviews = () => {
  const { user, loading, fetchMore, refetch } = useCurrentUser(
    { includeReviews: true, first: 10 },
    "cache-and-network"
  );
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();
  if (!user || loading) {
    return null;
  }
  const reviews = user.reviews.edges.map((r) => r.node);
  const handleEndReached = () => {
    fetchMore();
  };
  const handleDelete = async (review) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: async () => {
            try {
              await deleteReview(review.id);
              refetch();
            } catch (ex) {
              console.log(ex.message);
            }
          },
        },
      ]
    );
  };
  const handleView = (review) => {
    navigate(`/repo/${review.repositoryId}`);
  };
  const handleReviewRender = ({ item }) => {
    return (
      <ReviewItem
        onView={handleView}
        onDelete={handleDelete}
        viewOrDelete
        review={item}
        title={item.repository.fullName}
      />
    );
  };
  return (
    <FlatList
      data={reviews}
      renderItem={handleReviewRender}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.5}
      onEndReached={handleEndReached}
    />
  );
};

export default MyReviews;
