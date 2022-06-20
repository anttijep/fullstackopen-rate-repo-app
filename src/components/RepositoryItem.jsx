import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { numberToString } from "../utils/util";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";
import Button from "./Button";

const styles = StyleSheet.create({
  flexContainer: {
    ...theme.defaultContainer,
  },
  flexTopRow: {
    flexGrow: 1,
    flexDirection: "row",
  },
  flexTopRowContent: {
    ...theme.contentContainer,
  },
  flexBottomRow: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  flexBottomRowContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  languageTextContainer: {
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    alignSelf: "flex-start",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  languageText: {
    color: "white",
  },
  avatar: {
    ...theme.avatarSize,
    borderRadius: 5,
  },
});

const StatisticsText = ({ stat, text }) => {
  return (
    <View style={styles.flexBottomRowContent}>
      <Text fontSize="subheading" fontWeight="bold">
        {numberToString(stat)}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

const RepositoryItem = ({ style, item, singleView }) => {
  const navigate = useNavigate();
  const onPressName = () => {
    navigate(`/repo/${item.id}`);
  };
  const handleGithubLink = async () => {
    if (!item.url) {
      console.error("Url missing from link");
      return;
    }
    try {
      await Linking.openURL(item.url);
    } catch (ex) {
      console.error(ex);
    }
  };
  const containerStyle = {...styles.flexContainer, ...style};
  return (
    <View testID="repositoryItem" style={containerStyle}>
      <View style={styles.flexTopRow}>
        <Pressable disabled={singleView} onPress={onPressName}>
          <Image
            testID="repositoryItemImage"
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </Pressable>
        <View style={styles.flexTopRowContent}>
          <Pressable disabled={singleView} onPress={onPressName}>
            <Text fontSize="subheading" fontWeight="bold">
              {item.fullName}
            </Text>
          </Pressable>
          <Text>{item.description}</Text>
          <View style={styles.languageTextContainer}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexBottomRow}>
        <StatisticsText stat={item.stargazersCount} text="Stars" />
        <StatisticsText stat={item.forksCount} text="Forks" />
        <StatisticsText stat={item.reviewCount} text="Reviews" />
        <StatisticsText stat={item.ratingAverage} text="Rating" />
      </View>
      {singleView && (
        <Button onPress={handleGithubLink} text="View on GitHub"/>
      )}
    </View>
  );
};

export default RepositoryItem;
