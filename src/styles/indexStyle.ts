import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },

  appLogo: {
    width: 300,
    height: 300,
  },

  loginText: {
    color: "#fff",
    fontSize: 30,
  },

  emailText: {
    color: "#fff",
    fontSize: 15,
  },
  passwordText: {
    color: "#fff",
    fontSize: 15,
  },

  emailInput: {
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 30,
    textAlign: "center",
    width: 300,
    fontStyle: "italic",
  },

  passwordInput: {
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 30,
    textAlign: "center",
    width: 300,
    fontStyle: "italic",
  },

  containerButton: {
    marginTop: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  containerButtonRegister: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    textAlign: "center",
    justifyContent: "center",
    color: colors.white[100],
    fontWeight: "bold",
    fontSize: 20,
  },

  loginPressable: {
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: colors.button[100],
    borderRadius: 20,
    width: 300,
  },
});
