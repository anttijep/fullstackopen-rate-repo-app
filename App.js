import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "react-native";
import { ApolloProvider } from "@apollo/client";

import AuthStorage from "./src/utils/authStorage";
const authStorage = new AuthStorage();
import AuthStorageContext from "./src/contexts/AuthStorageContext";

import createApolloClient from "./src/utils/apolloClient";
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
