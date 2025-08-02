import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from "../styles/greetingsStyles";
import { colors } from "../styles/colors";

export default function Greetings() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={styles.container}
    >
      <View>
        <Image
          source={require("../assets/images/greetings.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.congratulationsTextContainer}>
        <Text style={styles.congratulationsTexuppercase}>PARABÉNS!!!</Text>
        <Text style={styles.congratulationsTextlowercase}>continue assim!</Text>
      </View>

      <View>
        <Pressable onPress={() => router.push("./home")}>
          <Text>Voltar</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
