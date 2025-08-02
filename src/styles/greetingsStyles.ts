import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
  image: {
    width: 250,
    height: 250,
  },

  congratulationsTextContainer: {},

  congratulationsTexuppercase: {
    textAlign: "center",
    color: colors.white[100],
    fontSize: 36,
  },

  congratulationsTextlowercase: {
    textAlign: "center",
    color: colors.white[100],
    fontSize: 16,
  },
});
