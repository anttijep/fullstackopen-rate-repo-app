import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import { Route, Routes, Navigate, useMatch } from "react-router-native";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import CreateReview from "./CreateReview";
import SingleRepository from "./SingleRepository";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground,
  },
});

const Main = () => {
  const match = useMatch("/repo/:id");
  const id = match ? match.params.id : null;
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signIn" element={<SignIn></SignIn>}/>
        <Route path="/signOut" element={<SignOut/>}/>
        <Route path="/repo/:id" element={<SingleRepository id={id}/>}/>
        <Route path="/review" element={<CreateReview/>}/>
        <Route path="/myReviews" element={<MyReviews/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
