import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarBackground: "#24292e",
    header: "white",
    appBackground: "#e1e4e8",
    defaultBackground: "white",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 16,
    subheading: 18,
    header: 20,
    textInput: 25,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  inputContainer: {
    padding: 10,
  },
  inputField: {
    borderWidth: 1,
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "lightgrey",
  },
};

export default theme;
