import { StyleSheet, Dimensions } from "react-native";
const { width: screenW, height: screenH } = Dimensions.get("window");
const LOGO_SIZE = screenW * 1; 

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: screenW,
    height: screenH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", 
  },

  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: 32,
  },
  button: {
    borderRadius: 24,
    width: "70%",
  },
  buttonContent: {
    height: 48,
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
