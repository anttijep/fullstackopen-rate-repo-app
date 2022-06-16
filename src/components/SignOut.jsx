import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import { View } from "react-native";
import Text from "./Text";
import { useEffect } from "react";

const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  useEffect(() => {
    (async () => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate("/");
    })();
  }, []);
  return (
    <View>
      <Text>Signing out...</Text>
    </View>
  );
};

export default SignOut;
