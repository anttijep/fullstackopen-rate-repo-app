import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native"

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    ...theme.inputContainer,
    backgroundColor: theme.colors.defaultBackground,
  },
  loginButton: {
    ...theme.inputField,
    backgroundColor: theme.colors.primary,
  },
  loginText: {
    textAlign: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        autoCapitalize="none"
        placeholder="Username"
        name="username"
      />
      <FormikTextInput
        autoCapitalize="none"
        placeholder="Password"
        name="password"
        secureTextEntry
      />
      <Pressable style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginText} fontSize="input" color="header">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async ({username, password}) => {
    try {
      await signIn({username, password});
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
