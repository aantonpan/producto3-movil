import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  link: {
    marginTop: 12,
    color: "blue",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: Dimensions.get("window").width - 32,
    height: ((Dimensions.get("window").width - 32) * 9) / 16,
    backgroundColor: "#000",
    borderRadius: 8,
  },
});
