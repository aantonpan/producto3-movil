import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f4f4f4",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: "cover",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  data: {
    fontSize: 16,
  },
});
