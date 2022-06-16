import { LOGIN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const signIn = async ({ username, password }) => {
    const ret = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(ret.data.authenticate.accessToken);
    await apolloClient.resetStore();
    return ret;
  };
  return [signIn, result];
};

export default useSignIn;
