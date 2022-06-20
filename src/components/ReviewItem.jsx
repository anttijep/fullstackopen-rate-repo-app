import { View } from "react-native";
import Text from "./Text";
import { StyleSheet } from "react-native";
import theme from "../theme";
import { format } from "date-fns";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    ...theme.defaultContainer,
  },
  topBox: {
    flexDirection: "row",
  },
  topRightBox: {
    ...theme.contentContainer,
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  review: {
    ...theme.avatarSize,
    borderWidth: 3,
    borderRadius: theme.avatarSize.width,
    borderColor: theme.colors.primary,
    justifyContent: "center",
  },
  reviewText: {
    textAlign: "center",
    color: theme.colors.primary,
  },
});

const ReviewItem = ({ review, title, viewOrDelete, onDelete, onView }) => {
  const handleViewRepository = () => {
    if (onView) {
      onView(review);
    }
  };
  const handleDeleteReview = () => {
    if (onDelete) {
      onDelete(review);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.review}>
          <Text fontWeight="bold" fontSize="header" style={styles.reviewText}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.topRightBox}>
          <Text fontWeight="bold" fontSize="header">
            {title || review.user.username}
          </Text>
          <Text>{format(new Date(review.createdAt), "yyyy/MM/dd")}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {(viewOrDelete && (
        <View style={styles.bottomBox}>
          <Button onPress={handleViewRepository} text="View repository" />
          <Button onPress={handleDeleteReview} warn text="Delete review" />
        </View>
      ))}
    </View>
  );
};
export default ReviewItem;
