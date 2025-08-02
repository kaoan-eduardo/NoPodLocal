import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, TextInput, Alert, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/indexStyle";
import { colors } from "../styles/colors";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const dados = await AsyncStorage.getItem("usuario");
      if (dados !== null) {
        const usuario = JSON.parse(dados);

        if (email === usuario.email && senha === usuario.senha) {
          router.push("./home");
        } else {
          Alert.alert("Email ou senha incorretos");
        }
      } else {
        Alert.alert("Nenhum usuário cadastrado");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Erro ao acessar os dados");
    }
  };

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={styles.container}
    >
      {/* Logotipo */}
      <Image
        source={require("../../src/assets/images/appLogo.png")}
        style={styles.appLogo}
      />

      {/* Texto de login */}
      <Text style={styles.loginText}>Login</Text>

      {/* Campo de e-mail */}
      <Text style={styles.emailText}>E-mail</Text>
      <TextInput
        placeholder="seuemail@exemplo.com"
        style={styles.emailInput}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de senha */}
      <Text style={styles.passwordText}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        style={styles.passwordInput}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Entrar */}
      <View style={styles.containerButton}>
        <Pressable style={styles.loginPressable} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </Pressable>
      </View>

      {/* Botão Cadastrar */}
      <View style={styles.containerButtonRegister}>
        <Pressable
          style={styles.loginPressable}
          onPress={() => router.push("./register")}
        >
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
