import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    marginBottom: 5,
    backgroundColor: theme.colors.defaultBackground,
    padding: 5,
  },
  flexTopRow: {
    flexGrow: 1,
    flexDirection: "row",
  },
  flexTopRowContent: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    flexGrow: 1,
    justifyContent: "space-between",
    width: 0,
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
    height: 45,
    width: 45,
    borderRadius: 5,
  },
});

const numberToString = (num) => {
  if (num < 1000) {
    return num.toString();
  }
  return `${(Math.round(num / 100) / 10).toString()}k`;
};

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

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexTopRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexTopRowContent}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
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
    </View>
  );
};

export default RepositoryItem;
