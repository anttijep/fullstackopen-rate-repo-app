import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBarBackground,
    padding: 10,
    paddingTop: Constants.statusBarHeight,
  },
  element: {
    padding: 5,
  }
});

const AppBarTab = ({ text, link }) => {
  return (
    <View style={styles.element}>
      <Link to={link}>
        <Text fontSize="header" color="header">
          {text}
        </Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" />
        <AppBarTab link="/sign" text="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
