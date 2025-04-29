// styles/detalleStyles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

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
    backgroundColor: "#F9F9F9",
  },
  card: {
    width: SCREEN_W - 32,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  cover: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  title: {
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#FFA500",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  rowEven: {
    backgroundColor: "#F2F2F2",
  },
  cellLabel: {
    flex: 1,
    fontWeight: "500",
    color: "#333333",
  },
  cellValue: {
    flex: 1,
    textAlign: "right",
    color: "#555555",
  },
  actions: {
    padding: 16,
    flexDirection: "row",
    alignSelf: "center",
  },
  playButton: {
    width: 200,
    borderRadius: 32,
    backgroundColor: "#FFA500",
  },

  // estilos del modal de imagen
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  fullImage: {
    width: SCREEN_W * 0.9,
    height: SCREEN_H * 0.5,
    marginBottom: 12,
  },
  modalCloseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  modalCloseIcon: {
    marginRight: 8,
  },
  modalCloseText: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "600",
  },
});
