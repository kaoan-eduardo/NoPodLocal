/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, TextInput, Alert, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/indexStyle";
import { colors } from "../styles/colors";

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const usuario = { nome, email, senha };

    try {
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
      Alert.alert("Cadastro realizado com sucesso!");
      router.push("./");
    } catch (error) {
      Alert.alert("Erro ao salvar os dados");
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

      {/* Título */}
      <Text style={styles.loginText}>Cadastro</Text>

      {/* Nome */}
      <Text style={styles.emailText}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        style={styles.emailInput}
        value={nome}
        onChangeText={setNome}
      />

      {/* Email */}
      <Text style={styles.emailText}>E-mail</Text>
      <TextInput
        placeholder="seuemail@exemplo.com"
        style={styles.emailInput}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Senha */}
      <Text style={styles.passwordText}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        style={styles.passwordInput}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Cadastrar */}
      <View style={styles.containerButton}>
        <Pressable style={styles.loginPressable} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          style={styles.loginPressable}
          onPress={() => router.push("./")}
        >
          <Text style={styles.loginButtonText}>Voltar</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
