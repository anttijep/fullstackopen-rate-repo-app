import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

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
  const { data, loading } = useQuery(GET_ME);
  const me = loading || !data ? null : data.me;
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" />
        {(me && <AppBarTab link="/signOut" text="Sign out" />) || (
          <AppBarTab link="/signIn" text="Sign in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
