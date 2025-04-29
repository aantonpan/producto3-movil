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
    elevation: 4,
  },
  actions: {
    alignSelf:      'stretch',   // <–– estira al ancho del Card
    flexDirection:  'row',
    justifyContent: 'center',
    padding:        16,
  },
});
