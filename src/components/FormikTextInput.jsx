import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  text: {
    color: theme.colors.textPrimary,
  },
  textField: {
    ...theme.inputField,
    fontSize: theme.fontSizes.textInput,
  },
  errorField: {
    ...theme.inputField,
    fontSize: theme.fontSizes.textInput,
    borderColor: theme.colors.error,
  },
});

const FormikTextInput = ({ style, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const inputStyle = [meta.error ? styles.errorField : styles.textField, style];

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={inputStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
