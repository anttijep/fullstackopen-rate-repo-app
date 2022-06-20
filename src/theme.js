import { Platform } from "react-native";

const defaultBackground = "white";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarBackground: "#24292e",
    header: "white",
    buttonText: "white",
    appBackground: "#e1e4e8",
    defaultBackground: defaultBackground,
    error: "#d73a4a",
  },
  fontSizes: {
    body: 16,
    subheading: 18,
    header: 20,
    textInput: 25,
    buttonText: 20,
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
  defaultContainer: {
    display: "flex",
    backgroundColor: defaultBackground,
    padding: 15,
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
  avatarSize: {
    height: 50,
    width: 50,
  },
  contentContainer: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    flexGrow: 1,
    justifyContent: "space-between",
    width: 0,
  },
};

export default theme;
