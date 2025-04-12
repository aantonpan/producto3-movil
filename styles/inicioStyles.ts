import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
