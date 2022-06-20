import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    ...theme.inputField,
    backgroundColor: theme.colors.primary,
  },
  buttonWarn: {
    ...theme.inputField,
    backgroundColor: theme.colors.error,
  },
  text: {
    textAlign: "center",
  },
});

const Button = ({ style, onPress, text, warn }) => {
  const buttonStyle = [warn ? styles.buttonWarn : styles.button, style];
  return (
    <Pressable onPress={onPress}>
      <View style={buttonStyle}>
        <Text fontSize="button" color="button" style={styles.text}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
