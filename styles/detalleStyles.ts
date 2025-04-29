// styles/detalleStyles.ts
import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  card: {
    width: Dimensions.get("window").width - 32,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 6, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 16,
    textAlign: "center",
    color: "#FFA500",
    fontWeight: "bold",
  },
  cellLabel: {
    fontWeight: "bold",
    color: "#333333",
  },

  cellValue: {
    color: "#333333",
    textAlign: 'right',
  },

  actions: {
    alignSelf: "stretch",
    padding: 16,
  },
});
