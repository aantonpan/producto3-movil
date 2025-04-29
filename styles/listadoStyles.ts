// styles/listadoStyles.ts
import { StyleSheet, Dimensions } from "react-native";
const { width: screenW } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", 
    paddingTop: 0, 
  },
  list: {
    padding: 16,
    paddingBottom: 24,

  },
  contentEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
    fontSize: 16,
  },
});
