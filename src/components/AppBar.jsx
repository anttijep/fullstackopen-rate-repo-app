import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import useCurrentUser from "../hooks/useCurrentUser";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBarBackground,
    paddingTop: Constants.statusBarHeight,
  },
  barLink: {
    paddingBottom: 15,
    paddingLeft: 15,
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <View style={styles.barLink}>
      <Link to={link}>
        <Text fontSize="header" color="header">
          {text}
        </Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  const { user } = useCurrentUser();
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" />
        {(user && (
          <>
            <AppBarTab link="/review" text="Create a review" />
            <AppBarTab link="/myReviews" text="My reviews" />
            <AppBarTab link="/signOut" text="Sign out" />
          </>
        )) || (
          <>
            <AppBarTab link="/signIn" text="Sign in" />
            <AppBarTab link="/signUp" text="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
