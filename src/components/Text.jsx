import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorHeader: {
    color: theme.colors.header,
  },
  colorButton: {
    color: theme.colors.buttonText,
  },
  fontSizeHeader: {
    fontSize: theme.fontSizes.header,
  },
  fontSizeInput: {
    fontSize: theme.fontSizes.textInput,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  fontSizeButton: {
    fontSize: theme.fontSizes.buttonText,
  }
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "header" && styles.colorHeader,
    color === "button" && styles.colorButton,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontSize === "header" && styles.fontSizeHeader,
    fontSize === "input" && styles.fontSizeInput,
    fontSize === "button" && styles.fontSizeButton,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
