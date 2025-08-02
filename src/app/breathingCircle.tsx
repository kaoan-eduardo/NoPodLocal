import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { styles } from "../styles/breathingCircleStyles";
import { colors } from "../styles/colors";

export default function BreathingCircle() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 2.5,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={styles.container}
    >
      <View style={styles.goBackButton}>
        <Pressable
          onPress={() => router.push("./greetings")}
          style={styles.goBackPressable}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.pressableText}>Voltar</Text>
        </Pressable>
      </View>
      <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
        Utilize a figura abaixo para controlar sua respiração
      </Text>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: 150,
          fontSize: 16,
        }}
      >
        (Fique o tempo que precisar)
      </Text>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </LinearGradient>
  );
}
