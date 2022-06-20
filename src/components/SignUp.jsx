import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
import useCreateUser from "../hooks/useCreateUser";
import Button from "./Button";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const styles = StyleSheet.create({
  container: {
    ...theme.inputContainer,
    backgroundColor: theme.colors.defaultBackground,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "5 or more characters")
    .max(50, "max of 50 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        autoCapitalize="none"
        placeholder="Password confirmation"
        name="passwordConfirmation"
        secureTextEntry
      />
      <Button text="Sign up" onPress={onSubmit} />
    </View>
  );
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [createUser] = useCreateUser();
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    try {
      await createUser(values);
      await signIn(values);
      navigate("/");
    } catch (ex) {
      console.error(ex.message);
    }
  };
  return <SignUpContainer onSubmit={handleSignUp} />;
};

export default SignUp;
