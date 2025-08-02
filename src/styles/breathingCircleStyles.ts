import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.button[100],
  },
  goBackButton: {
    position: "absolute",
    top: 45,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackPressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  pressableText: {
    color: colors.white[100],
  },
});
